
-- Migration to update registrations table for compliance
-- 1. Rename gender to sex
-- 2. Add ethnicity, religion
-- 3. Modify disability handling
-- 4. Remove citizen, constitution, physical address


-- Add new columns
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS religion TEXT,
ADD COLUMN IF NOT EXISTS ethnicity TEXT,
ADD COLUMN IF NOT EXISTS other_names TEXT,
ADD COLUMN IF NOT EXISTS identity_type TEXT DEFAULT 'National ID'; -- 'National ID' or 'Passport'

-- Convert disability_status to handle specific PWD number or NULL
-- We'll keep the column name 'disability_status' but use it for the PWD Number if provided, 
-- or we can add a specific 'pwd_number' column and deprecate 'disability_status'.
-- Let's add 'pwd_number' for clarity as requested "if a user checks disabled, the pwd number is prompted".
ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS pwd_number TEXT;

-- Remove columns
ALTER TABLE registrations
DROP COLUMN IF EXISTS is_kenyan_citizen,
DROP COLUMN IF EXISTS agree_to_constitution,
DROP COLUMN IF EXISTS physical_address;

-- Ensure consent col exists (it does in setup, but good to ensure uniqueness if needed)
-- ALTER TABLE registrations ADD COLUMN IF NOT EXISTS consent_to_data_processing BOOLEAN DEFAULT false; (Already exists)

-- Update RLS if needed (Policies on 'registrations' usually cover all cols, so just Select/Insert needs check)
-- No changes needed to policies if they are just checking 'true' for insert.

-- Add index for PWD number if needed
CREATE INDEX IF NOT EXISTS idx_registrations_pwd_number ON registrations(pwd_number);

-- Comment:
-- "Declaration to adhere to party constitution" -> Removed column
-- "Citizenship declaration" -> Removed column
-- "Physical address" -> Removed column
-- "Gender" -> Renamed to "Sex" (Reverted per user: keeping 'gender')

-- 5. Membership Verification Function (Secure)
-- This function allows checking if a member exists by ID without exposing the table to public SELECTs
CREATE OR REPLACE FUNCTION check_membership_status(check_id text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  exists_result boolean;
  member_name text;
BEGIN
  SELECT 
    EXISTS(SELECT 1 FROM registrations WHERE id_number = check_id),
    (first_name || ' ' || last_name)
  INTO exists_result, member_name
  FROM registrations 
  WHERE id_number = check_id;

  IF exists_result THEN
    RETURN json_build_object('exists', true, 'message', 'Member Found: ' || member_name);
  ELSE
    RETURN json_build_object('exists', false, 'message', 'Member Not Found');
  END IF;
END;
$$;


