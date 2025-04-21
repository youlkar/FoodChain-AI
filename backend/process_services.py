import pandas as pd
import json
import os
import re
from collections import defaultdict

print("Starting data processing...")

# Read the Excel files
print("Reading Excel files...")
markets_services_df = pd.read_excel('Data/CAFB_Markets_Wraparound_Services.xlsx')
shopping_services_df = pd.read_excel('Data/CAFB_Shopping_Partners_Wraparound_Services.xlsx', engine='openpyxl')

print(f"Loaded services data: {len(markets_services_df)} markets rows, {len(shopping_services_df)} shopping partners rows")

# Try to read the hours of operation files
try:
    markets_hoo_df = pd.read_excel('Data/CAFB_Markets_HOO.xlsx', engine='openpyxl')
    shopping_hoo_df = pd.read_excel('Data/CAFB_Shopping_Partners_HOO.xlsx', engine='openpyxl')
    has_hoo_data = True
    print(f"Successfully loaded hours of operation data: {len(markets_hoo_df)} markets rows, {len(shopping_hoo_df)} shopping partners rows")
    
    # Print column names for debugging
    print("Markets HOO columns:", markets_hoo_df.columns.tolist())
    print("Shopping HOO columns:", shopping_hoo_df.columns.tolist())
    
except Exception as e:
    print(f"Warning: Could not load hours of operation data: {e}")
    has_hoo_data = False

# Combine both services dataframes
services_df = pd.concat([markets_services_df, shopping_services_df], ignore_index=True)

# Map services to their IDs (slugs)
service_map = {
    'Housing': 'housing',
    'Financial assistance': 'financial-assistance',
    'Financial advising': 'financial-advising',
    'Non-food items': 'non-food-items',
    'Behavioral Healthcare': 'behavioral-healthcare',
    'Job training/ workforce development': 'job-training',
    'Programming/ support for older adults': 'older-adults',
    'Case management': 'case-management',
    'Info on gov\'t benefits': 'govt-benefits-info',
    'Childcare': 'childcare',
    'Gov\'t benefits enrollment': 'govt-benefits-enrollment',
    'Healthcare': 'healthcare',
    'ESL': 'esl',
    'Legal services': 'legal-services'
}

# Function to clean text and ensure it's JSON-safe
def clean_text(text):
    if pd.isna(text) or text is None:
        return ""
    
    # Convert to string if not already
    text = str(text).strip()
    
    # Replace problematic characters
    text = re.sub(r'[\x00-\x1F\x7F-\x9F]', '', text)  # Remove control characters
    
    # Replace special quotes with standard ones
    text = text.replace('"', '"').replace('"', '"')
    text = text.replace("'", "'").replace("'", "'")
    
    return text

# Create dictionaries to store agency information with different keys for better matching
agency_info_by_id = {}
agency_info_by_name = {}

# Map day names to database day names
day_map = {
    'Monday': 'monday',
    'Tuesday': 'tuesday',
    'Wednesday': 'wednesday',
    'Thursday': 'thursday',
    'Friday': 'friday',
    'Saturday': 'saturday',
    'Sunday': 'sunday',
    'Mon': 'monday',
    'Tue': 'tuesday',
    'Wed': 'wednesday',
    'Thu': 'thursday',
    'Fri': 'friday',
    'Sat': 'saturday',
    'Sun': 'sunday'
}

# Process hours of operation data if available
if has_hoo_data:
    combined_hoo_df = pd.concat([markets_hoo_df, shopping_hoo_df], ignore_index=True)
    
    print(f"Processing {len(combined_hoo_df)} combined HOO rows")
    missing_address = 0
    missing_phone = 0
    missing_hours = 0
    
    for index, row in combined_hoo_df.iterrows():
        # Get agency identifiers - markets uses 'Agency ID', shopping uses 'External ID'
        agency_id = ""
        if 'Agency ID' in row and pd.notna(row['Agency ID']):
            agency_id = clean_text(str(row['Agency ID']))
        elif 'External ID' in row and pd.notna(row['External ID']):
            agency_id = clean_text(str(row['External ID']))
            
        agency_name = ""
        if 'Agency Name' in row and pd.notna(row['Agency Name']):
            agency_name = clean_text(str(row['Agency Name']))
        
        if not agency_id and not agency_name:
            print(f"Warning: Row {index} has no agency ID or name, skipping")
            continue
            
        # Get address - both use 'Shipping Address'
        address = ""
        if 'Shipping Address' in row and pd.notna(row['Shipping Address']):
            address = clean_text(row['Shipping Address'])
                
        if not address:
            missing_address += 1
            
        # Get phone - shopping HOO has 'Phone'
        phone = ""
        if 'Phone' in row and pd.notna(row['Phone']):
            phone = clean_text(row['Phone'])
                
        if not phone:
            missing_phone += 1
        
        # Extract days and hours of operation
        days_open = []
        hours_info = {}
        
        # Check if this row has hours data
        has_hours = False
        
        # Both files use 'Day or Week', 'Starting Time', 'Ending Time'
        if 'Day or Week' in row and pd.notna(row['Day or Week']) and \
           'Starting Time' in row and pd.notna(row['Starting Time']) and \
           'Ending Time' in row and pd.notna(row['Ending Time']):
            
            day = clean_text(row['Day or Week'])
            start_time = row['Starting Time']
            end_time = row['Ending Time']
            
            # Check if we have valid day and times
            if day and pd.notna(start_time) and pd.notna(end_time):
                # Try to map the day to a standard format
                day_lower = day.lower()
                
                for day_key, day_value in day_map.items():
                    if day_key.lower() in day_lower:
                        normalized_day = day_value
                        days_open.append(day_key)
                        has_hours = True
                        
                        # Format times as strings
                        try:
                            start_str = start_time.strftime("%I:%M %p") if isinstance(start_time, pd.Timestamp) else clean_text(str(start_time))
                            end_str = end_time.strftime("%I:%M %p") if isinstance(end_time, pd.Timestamp) else clean_text(str(end_time))
                            
                            hours_info[normalized_day] = f"{start_str} - {end_str}"
                        except Exception as e:
                            print(f"Error formatting time for {agency_name}: {e}")
                        
                        break
        
        if not has_hours:
            missing_hours += 1
        
        # Check if appointment is needed
        appointment_needed = "Unknown"
        if 'By Appointment Only' in row and pd.notna(row['By Appointment Only']):
            value = row['By Appointment Only']
            if isinstance(value, bool):
                appointment_needed = "Yes" if value else "No"
            elif isinstance(value, str):
                if value.lower() in ['yes', 'true', '1', 'required', 'y', 'by appointment only']:
                    appointment_needed = "Yes"
                elif value.lower() in ['no', 'false', '0', 'not required', 'n']:
                    appointment_needed = "No"
        
        agency_data = {
            'address': address,
            'phone': phone,
            'days_open': days_open,
            'hours': hours_info,
            'appointment_needed': appointment_needed
        }
        
        # Store by ID and name for better matching
        if agency_id:
            agency_info_by_id[agency_id] = agency_data
        
        if agency_name:
            agency_info_by_name[agency_name.lower()] = agency_data
    
    print(f"Agency data summary:")
    print(f"- Total agencies processed: {len(agency_info_by_id) + len(agency_info_by_name)}")
    print(f"- Agencies with missing address: {missing_address}")
    print(f"- Agencies with missing phone: {missing_phone}")
    print(f"- Agencies with missing hours: {missing_hours}")
    print(f"- Agencies by ID: {len(agency_info_by_id)}")
    print(f"- Agencies by name: {len(agency_info_by_name)}")

# Create a dictionary with services as keys and lists of agencies as values
services_data = defaultdict(list)
agencies_processed = 0
agencies_with_details = 0

# Process each row in the dataframe
for index, row in services_df.iterrows():
    agency_id = clean_text(str(row['Agency ID']))
    agency_name = clean_text(row['Agency Name'])
    service = clean_text(row['Wraparound Service'])
    
    # Skip if service is not in our mapping
    if service not in service_map:
        continue
    
    service_id = service_map[service]
    
    # Check if agency already exists in this service
    agency_exists = False
    for agency in services_data[service_id]:
        if agency['id'] == agency_id or agency['name'].lower() == agency_name.lower():
            agency_exists = True
            break
    
    # If agency doesn't exist, add it
    if not agency_exists:
        agencies_processed += 1
        
        # Try to get agency info by ID or name
        info = {}
        if agency_id in agency_info_by_id:
            info = agency_info_by_id[agency_id]
            agencies_with_details += 1
        elif agency_name.lower() in agency_info_by_name:
            info = agency_info_by_name[agency_name.lower()]
            agencies_with_details += 1
        
        has_details = any([
            info.get('address', ''),
            info.get('phone', ''),
            info.get('days_open', []),
            info.get('hours', {})
        ])
        
        if has_details:
            print(f"Found details for {agency_name}")
            if info.get('address'):
                print(f"  - Address: {info['address']}")
            if info.get('phone'):
                print(f"  - Phone: {info['phone']}")
            if info.get('days_open'):
                print(f"  - Days open: {info['days_open']}")
            if info.get('hours'):
                print(f"  - Hours: {info['hours']}")
        
        agency_data = {
            'id': agency_id,
            'name': agency_name,
            'address': info.get('address', ''),
            'phone': info.get('phone', ''),
            'days_open': info.get('days_open', []),
            'hours': info.get('hours', {}),
            'appointment_needed': info.get('appointment_needed', 'Unknown'),
            'website': ''  # No website in data, leave empty for now
        }
        
        services_data[service_id].append(agency_data)

print(f"Agency processing summary:")
print(f"- Total unique agencies processed: {agencies_processed}")
print(f"- Agencies with details: {agencies_with_details}")

# Create the services list
services_list = []
for service_name, service_id in service_map.items():
    # Only add services that have agencies
    if services_data[service_id]:
        services_list.append({
            'id': service_id,
            'name': service_name
        })

# Create the final data structure
data = {
    'services': services_list,
    'agencyData': services_data
}

# Create the output directory if it doesn't exist
os.makedirs('frontend/src/data', exist_ok=True)

# Write to a JSON file
try:
    # First try the standard JSON dump
    with open('frontend/src/data/services.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=True)
        
    print("JSON successfully written using standard method")
    
    # Write a sample of the data for debugging
    with open('frontend/src/data/services_sample.json', 'w', encoding='utf-8') as f:
        sample_data = {}
        for service_id, agencies in services_data.items():
            if agencies:
                # Find up to 3 agencies with the most complete info
                agencies_with_info = []
                for agency in agencies:
                    if agency['address'] or agency['phone'] or agency['days_open'] or agency['hours']:
                        agencies_with_info.append(agency)
                        if len(agencies_with_info) >= 3:
                            break
                
                # If we don't have 3 agencies with info, just take the first 3
                if not agencies_with_info:
                    agencies_with_info = agencies[:3]
                    
                sample_data[service_id] = agencies_with_info[:3]  # Just the first 3 agencies per service
                
        json.dump({"sample": sample_data}, f, indent=2, ensure_ascii=True)
    
    print("Sample data written for debugging")
    
except Exception as e:
    print(f"Error with standard JSON writing: {e}")
    
    try:
        # Manual JSON serialization for safety
        with open('frontend/src/data/services.json', 'w', encoding='utf-8') as f:
            # Simple manual conversion for specific problematic values
            import json
            class SafeEncoder(json.JSONEncoder):
                def default(self, obj):
                    if isinstance(obj, pd.Timestamp):
                        return obj.strftime("%I:%M %p")
                    return json.JSONEncoder.default(self, obj)
            
            json.dump(data, f, indent=2, ensure_ascii=True, cls=SafeEncoder)
            
        print("JSON successfully written using manual serialization")
    except Exception as e:
        print(f"Error with manual serialization: {e}")

print(f"Processed {len(services_df)} rows.")
print(f"Created {len(services_list)} services.")
print(f"Data saved to 'frontend/src/data/services.json'")

# Print some statistics
print("\nAgencies per service:")
for service_name, service_id in service_map.items():
    agency_count = len(services_data[service_id])
    print(f"{service_name}: {agency_count} agencies") 