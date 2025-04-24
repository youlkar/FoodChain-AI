import pandas as pd
import json
import os
from collections import defaultdict

print("Starting agency data processing...")

# Read the Excel files
print("Reading agency Excel files...")
markets_hoo_df = pd.read_excel('../Data/CAFB_Markets_HOO.xlsx', engine='openpyxl')
shopping_hoo_df = pd.read_excel('../Data/CAFB_Shopping_Partners_HOO.xlsx', engine='openpyxl')
markets_cultures_df = pd.read_excel('../Data/CAFB_Markets_Cultures_Served.xlsx', engine='openpyxl')
shopping_cultures_df = pd.read_excel('../Data/CAFB_Shopping_Partners_Cultures_Served.xlsx', engine='openpyxl')

print(f"Loaded data: {len(markets_hoo_df)} markets rows, {len(shopping_hoo_df)} shopping partners rows")
print(f"Loaded cultures data: {len(markets_cultures_df)} markets cultures rows, {len(shopping_cultures_df)} shopping partners cultures rows")

# Debug: Print column names to verify
print("Markets HOO columns:", markets_hoo_df.columns.tolist())
print("Shopping HOO columns:", shopping_hoo_df.columns.tolist())

# Function to clean text
def clean_text(text):
    if pd.isna(text) or text is None:
        return ""
    return str(text).strip()

# Format time to HH:MM:SS format
def format_time(time_value):
    if pd.isna(time_value):
        return ""
    
    if isinstance(time_value, pd.Timestamp):
        return time_value.strftime("%H:%M:%S")
    
    if isinstance(time_value, str):
        # Try to convert to HH:MM:SS format if it's not already
        try:
            # Parse time from 12-hour format (e.g., "10:00 AM") if needed
            return pd.to_datetime(time_value).strftime("%H:%M:%S")
        except:
            return time_value
    
    return str(time_value)

# Function to find column name that contains a specific text
def find_column(df, text):
    matching_cols = [col for col in df.columns if text.lower() in col.lower()]
    return matching_cols[0] if matching_cols else None

# Dictionary to store agency information by name
agencies_by_name = {}

# Process hours of operation data
def process_hoo_data(hoo_df):
    # Find the actual column names that contain our target data
    distribution_col = find_column(hoo_df, 'Distribution Model') or find_column(hoo_df, 'Distribution') or 'Distribution Model'
    food_format_col = find_column(hoo_df, 'Food Format') or find_column(hoo_df, 'Format') or 'Food Format'
    hours_notes_col = find_column(hoo_df, 'Additional Note') or find_column(hoo_df, 'Hours Notes') or find_column(hoo_df, 'Hours Note') or 'Hours Notes'
    
    print(f"Using columns: Distribution={distribution_col}, Food Format={food_format_col}, Hours Notes={hours_notes_col}")
    
    for index, row in hoo_df.iterrows():
        # Get agency name
        agency_name = clean_text(row.get('Agency Name', ''))
        if not agency_name:
            continue
            
        # Get address
        address = clean_text(row.get('Shipping Address', ''))
            
        # Get phone
        phone = clean_text(row.get('Phone', ''))
        
        # Get days and hours of operation
        day = clean_text(row.get('Day or Week', ''))
        start_time = format_time(row.get('Starting Time', ''))
        end_time = format_time(row.get('Ending Time', ''))
        
        # Check if appointment is needed
        appointment_needed = "No"
        if 'By Appointment Only' in row and pd.notna(row['By Appointment Only']):
            value = row['By Appointment Only']
            if isinstance(value, bool) and value:
                appointment_needed = "Yes"
            elif isinstance(value, str) and value.lower() in ['yes', 'true', '1', 'required', 'y', 'by appointment only']:
                appointment_needed = "Yes"
        
        # Get food pantry requirements
        requirements = clean_text(row.get('Food Pantry Requirements', ''))
        
        # Get distribution model
        distribution_model = ""
        if distribution_col in row:
            distribution_model = clean_text(row[distribution_col])
        
        # Get food format if available
        food_format = ""
        if food_format_col in row:
            food_format = clean_text(row[food_format_col])
        
        # Get additional notes on hours
        hours_notes = ""
        if hours_notes_col in row:
            hours_notes = clean_text(row[hours_notes_col])
        
        # Get general notes
        notes = clean_text(row.get('Notes', ''))
        
        # Combine hours notes with general notes if both exist
        if hours_notes and notes:
            notes = f"Hours Notes: {hours_notes}. {notes}"
        elif hours_notes:
            notes = f"Hours Notes: {hours_notes}"
        
        # If agency doesn't exist yet, create it
        if agency_name not in agencies_by_name:
            agencies_by_name[agency_name] = {
                'name': agency_name,
                'address': address,
                'phone': phone,
                'hours': {},
                'appointment_needed': appointment_needed,
                'requirements': requirements,
                'distribution_model': distribution_model,
                'notes': notes,
                'cultures_served': [],
                'food_format': food_format,
            }
        else:
            # Update existing agency data if fields are empty
            agency = agencies_by_name[agency_name]
            if not agency['address'] and address:
                agency['address'] = address
            if not agency['phone'] and phone:
                agency['phone'] = phone
            if appointment_needed == "Yes":
                agency['appointment_needed'] = "Yes"
            if not agency['requirements'] and requirements:
                agency['requirements'] = requirements
            if not agency['distribution_model'] and distribution_model:
                agency['distribution_model'] = distribution_model
            if not agency['notes'] and notes:
                agency['notes'] = notes
            elif hours_notes and not agency['notes'].startswith("Hours Notes:"):
                # Add hours notes to existing notes
                agency['notes'] = f"Hours Notes: {hours_notes}. {agency['notes']}"
            if not agency.get('food_format') and food_format:
                agency['food_format'] = food_format
        
        # If we have valid day and times, add to hours
        if day and start_time and end_time:
            agency = agencies_by_name[agency_name]
            
            # Create time slot as structured data with start and end times
            time_slot = {
                "start": start_time,
                "end": end_time
            }
            
            if day in agency['hours']:
                # Check if this exact time slot already exists
                if not any(ts["start"] == time_slot["start"] and ts["end"] == time_slot["end"] 
                          for ts in agency['hours'][day]):
                    agency['hours'][day].append(time_slot)
            else:
                agency['hours'][day] = [time_slot]

# Process cultures served data
def process_cultures_data(cultures_df, name_column='Agency Name'):
    for index, row in cultures_df.iterrows():
        # Get agency name (handle different column names)
        agency_name = clean_text(row.get(name_column, ''))
        if not agency_name or agency_name not in agencies_by_name:
            continue
        
        # Get cultures served (handle different column names)
        culture = clean_text(row.get('Cultural Populations Served', ''))
        if culture and culture not in agencies_by_name[agency_name]['cultures_served']:
            agencies_by_name[agency_name]['cultures_served'].append(culture)

# Process both HOO dataframes
print("Processing hours of operation data...")
process_hoo_data(markets_hoo_df)
process_hoo_data(shopping_hoo_df)

# Process both cultures served dataframes
print("Processing cultures served data...")
process_cultures_data(markets_cultures_df, 'Agency Name')
process_cultures_data(shopping_cultures_df, 'Company Name')

# Format the final agency list - hours are already structured, so we don't need the format_hours function
agency_list = []
for name, data in agencies_by_name.items():
    agency = {
        'name': data['name'],
        'address': data['address'],
        'phone': data['phone'],
        'hours': data['hours'],  # Keep structured format
        'appointment_needed': data['appointment_needed'],
        'requirements': data['requirements'],
        'distribution_model': data['distribution_model'],
        'notes': data['notes'],
        'cultures_served': data['cultures_served'],
        'food_format': data['food_format'],
    }
    
    agency_list.append(agency)

# Sort agencies by name
agency_list.sort(key=lambda x: x['name'])

# Create the final data structure
data = {
    'agencies': agency_list
}

# Create the output directory if it doesn't exist
os.makedirs('../frontend/src/data', exist_ok=True)

# Write to a JSON file
with open('../frontend/src/data/agencies.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=True)

print(f"Processed {len(agency_list)} agencies.")
print(f"Data saved to '../frontend/src/data/agencies.json'") 