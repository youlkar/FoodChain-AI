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

# Function to clean text
def clean_text(text):
    if pd.isna(text) or text is None:
        return ""
    return str(text).strip()

# Format time to 12-hour format
def format_time(time_value):
    if pd.isna(time_value):
        return ""
    
    if isinstance(time_value, pd.Timestamp):
        return time_value.strftime("%I:%M %p").lstrip('0').replace(' 0', ' ')
    
    if isinstance(time_value, str):
        return time_value
    
    return str(time_value)

# Dictionary to store agency information by name
agencies_by_name = {}

# Process hours of operation data
def process_hoo_data(hoo_df):
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
        distribution_model = clean_text(row.get('Distribution Model', ''))
        
        # Get additional notes
        notes = clean_text(row.get('Notes', ''))
        
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
        
        # If we have valid day and times, add to hours
        if day and start_time and end_time:
            agency = agencies_by_name[agency_name]
            time_slot = f"{start_time} to {end_time}"
            
            if day in agency['hours']:
                if time_slot not in agency['hours'][day]:
                    agency['hours'][day].append(time_slot)
            else:
                agency['hours'][day] = [time_slot]

# Process cultures served data
def process_cultures_data(cultures_df):
    for index, row in cultures_df.iterrows():
        # Get agency name
        agency_name = clean_text(row.get('Agency Name', ''))
        if not agency_name or agency_name not in agencies_by_name:
            continue
        
        # Get cultures served
        culture = clean_text(row.get('Cultures Served', ''))
        if culture and culture not in agencies_by_name[agency_name]['cultures_served']:
            agencies_by_name[agency_name]['cultures_served'].append(culture)

# Process both HOO dataframes
print("Processing hours of operation data...")
process_hoo_data(markets_hoo_df)
process_hoo_data(shopping_hoo_df)

# Process both cultures served dataframes
print("Processing cultures served data...")
process_cultures_data(markets_cultures_df)
process_cultures_data(shopping_cultures_df)

# Function to format hours in a user-friendly way
def format_hours(hours_dict):
    if not hours_dict:
        return ""
    
    # Group days with the same time slots
    time_to_days = defaultdict(list)
    for day, time_slots in hours_dict.items():
        time_key = ", ".join(sorted(time_slots))
        time_to_days[time_key].append(day)
    
    # Format the result
    formatted_hours = []
    for time_key, days in time_to_days.items():
        # Sort days in order of the week
        day_order = {
            "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, 
            "Friday": 5, "Saturday": 6, "Sunday": 7
        }
        sorted_days = sorted(days, key=lambda d: day_order.get(d, 999))
        
        # Group consecutive days
        day_groups = []
        current_group = [sorted_days[0]]
        
        for i in range(1, len(sorted_days)):
            prev_day_idx = day_order.get(current_group[-1], 999)
            curr_day_idx = day_order.get(sorted_days[i], 999)
            
            if curr_day_idx == prev_day_idx + 1:
                current_group.append(sorted_days[i])
            else:
                day_groups.append(current_group)
                current_group = [sorted_days[i]]
        
        day_groups.append(current_group)
        
        # Format each group
        formatted_days = []
        for group in day_groups:
            if len(group) == 1:
                formatted_days.append(group[0])
            else:
                formatted_days.append(f"{group[0]}–{group[-1]}")
        
        formatted_hours.append(f"{', '.join(formatted_days)}: {time_key}")
    
    return "; ".join(formatted_hours)

# Format the final agency list
agency_list = []
for name, data in agencies_by_name.items():
    formatted_hours = format_hours(data['hours'])
    
    agency = {
        'name': data['name'],
        'address': data['address'],
        'phone': data['phone'],
        'hours': formatted_hours,
        'appointment_needed': data['appointment_needed'],
        'requirements': data['requirements'],
        'distribution_model': data['distribution_model'],
        'notes': data['notes'],
        'cultures_served': data['cultures_served']
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