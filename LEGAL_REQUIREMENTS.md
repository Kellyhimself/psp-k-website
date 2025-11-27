# Legal Requirements for Party Member Registration in Kenya

## Required Information for Member Registration

Based on Kenyan Political Parties Act and IEBC requirements, the following information should be collected:

### Mandatory Fields (Legal Requirements)

1. **Full Name** ✅ (Currently collected)
   - First Name
   - Last Name
   - Middle Name (if applicable)

2. **National Identification Number** ✅ (Currently collected)
   - Must be valid Kenyan National ID
   - Used for verification with IEBC database
   - Required for voting eligibility verification

3. **Contact Information** ✅ (Currently collected)
   - Email Address
   - Phone Number (Primary contact)

4. **Location Information** ✅ (Currently collected)
   - County (Required - for national character verification)
   - Constituency (Required - for representation tracking)
   - Ward (Required - for grassroots organization)
   - Physical Address (Recommended for official records)

5. **Demographic Information** (For compliance with inclusivity requirements)
   - Gender (Required - for gender balance tracking)
   - Date of Birth (Required - for age verification, must be 18+)
   - Disability Status (Optional but recommended - for marginalized groups tracking)

6. **Membership Declaration** (Legal requirement)
   - Confirmation that member is a Kenyan citizen
   - Confirmation that member is not a member of another political party
   - Agreement to abide by party constitution and code of conduct
   - Consent for data processing (GDPR/Data Protection Act compliance)

### Additional Recommended Fields

7. **Occupation/Profession** (Optional - for member profiling)
8. **Education Level** (Optional - for member profiling)
9. **Previous Political Party Membership** (If applicable)
10. **Special Interests/Areas of Interest** (For engagement purposes)

## Legal Compliance Requirements

### 1. Data Protection Act, 2019 Compliance

- **Privacy Policy**: Must be displayed and accepted
- **Data Collection Purpose**: Clearly state why data is collected
- **Data Retention**: Specify how long data will be stored
- **Data Sharing**: Disclose if data will be shared with IEBC/ORPP
- **Right to Access**: Members must be able to access their data
- **Right to Deletion**: Members must be able to request data deletion

### 2. Political Parties Act Requirements

- **National Character**: Must collect county data to verify national presence
- **Gender Balance**: Must track gender for compliance reporting
- **Inclusivity**: Should collect disability status for marginalized groups
- **Age Verification**: Must verify members are 18+ (voting age)

### 3. IEBC Requirements

- **National ID Verification**: Must verify ID numbers (can integrate with IEBC API if available)
- **Membership Database**: Must maintain accurate membership records
- **Reporting**: May need to submit membership data to IEBC periodically

### 4. Office of Registrar of Political Parties (ORPP) Requirements

- **Membership List**: Must maintain updated membership list
- **Constitutional Compliance**: Members must agree to party constitution
- **Code of Conduct**: Members must subscribe to party code of conduct

## Recommended Form Enhancements

### Add to Registration Form:

1. **Gender Field** (Required)
   ```typescript
   <select name="gender" required>
     <option value="">Select Gender</option>
     <option value="male">Male</option>
     <option value="female">Female</option>
     <option value="other">Other</option>
     <option value="prefer-not-to-say">Prefer not to say</option>
   </select>
   ```

2. **Date of Birth** (Required - for age verification)
   ```typescript
   <input type="date" name="dateOfBirth" required />
   ```

3. **Physical Address** (Recommended)
   ```typescript
   <textarea name="physicalAddress" rows="3"></textarea>
   ```

4. **Membership Declarations** (Required checkboxes)
   ```typescript
   <label>
     <input type="checkbox" required />
     I confirm I am a Kenyan citizen
   </label>
   <label>
     <input type="checkbox" required />
     I am not a member of any other political party
   </label>
   <label>
     <input type="checkbox" required />
     I agree to abide by PSP-K constitution and code of conduct
   </label>
   <label>
     <input type="checkbox" required />
     I consent to the processing of my personal data for party membership purposes
   </label>
   ```

5. **Privacy Policy Link** (Required)
   - Link to privacy policy page
   - Must be accepted before submission

6. **Disability Status** (Optional but recommended)
   ```typescript
   <select name="disabilityStatus">
     <option value="">Select if applicable</option>
     <option value="none">None</option>
     <option value="physical">Physical Disability</option>
     <option value="visual">Visual Impairment</option>
     <option value="hearing">Hearing Impairment</option>
     <option value="other">Other</option>
     <option value="prefer-not-to-say">Prefer not to say</option>
   </select>
   ```

## Data Storage and Security Requirements

1. **Secure Storage**: Encrypt sensitive data (National ID, personal info)
2. **Access Control**: Limit access to membership data
3. **Backup**: Regular backups of membership database
4. **Audit Trail**: Log all access to membership data
5. **Data Retention Policy**: Define how long to keep data
6. **Data Deletion**: Process for member data deletion requests

## Reporting Requirements

### To ORPP (Office of Registrar of Political Parties):
- Annual membership statistics
- Gender balance reports
- Regional distribution reports
- Membership growth reports

### To IEBC (Independent Electoral and Boundaries Commission):
- Membership list for verification (if requested)
- Voter registration verification

## Best Practices

1. **ID Verification**: Implement National ID validation (format: 8 digits, or new format)
2. **Duplicate Prevention**: Check for duplicate registrations (by ID number)
3. **Email Verification**: Send verification email to confirm registration
4. **SMS Confirmation**: Send SMS confirmation (optional but recommended)
5. **Member Portal**: Allow members to update their information
6. **Membership Card**: Generate digital membership card (optional)

## Privacy Policy Requirements

Must include:
- What data is collected
- Why it's collected
- How it's used
- Who it's shared with (IEBC, ORPP if applicable)
- How long it's retained
- How to access/update/delete data
- Contact information for data protection officer

## References

- [Political Parties Act, 2011](https://new.kenyalaw.org/akn/ke/act/2011/11/eng@2022-02-11)
- [Data Protection Act, 2019](https://www.odpc.go.ke/)
- [Office of Registrar of Political Parties](https://orpp.or.ke/)
- [IEBC Requirements](https://www.iebc.or.ke/)

## Important Notes

⚠️ **Legal Disclaimer**: This is a general guide. Consult with a Kenyan lawyer specializing in political party law and data protection for specific legal advice.

⚠️ **Data Protection**: Ensure compliance with Data Protection Act, 2019. Consider appointing a Data Protection Officer.

⚠️ **Regular Updates**: Political party laws may change. Regularly review and update your registration process.

