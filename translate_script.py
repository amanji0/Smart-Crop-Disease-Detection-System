import re
import json
from deep_translator import GoogleTranslator

# We will read the Schemes.jsx file, extract the centralSchemes and stateSchemes arrays
with open('Frontend/src/pages/Schemes.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Instead of complex regex, let's just parse the javascript arrays using a simple pattern
# It's easier to just use standard text replacing, or we can just translate the specific english strings.
# Wait, let's just extract all string literals that look like text inside the schemes array
strings_to_translate = [
    # central schemes
    'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    '₹6,000 per year paid in 3 equal installments of ₹2,000',
    'Direct Bank Transfer (DBT) to farmer\'s Aadhaar-linked account',
    'Covers all small and marginal farmer families',
    'All land-holding farmer families with cultivable land',
    'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    'Crop insurance at very low premium — 2% for Kharif, 1.5% for Rabi, 5% for horticulture',
    'Full claim amount with no cap on government subsidy',
    'Coverage for prevented sowing, mid-season adversity, post-harvest losses',
    'Use of satellite imagery & drones for faster claim settlement',
    'All farmers including sharecroppers and tenant farmers',
    'Kisan Credit Card (KCC) Scheme',
    'Credit limit up to ₹3 lakh at subsidized interest rate of 4% p.a.',
    'Interest subvention of 2% + additional 3% for prompt repayment',
    'Covers crop production, post-harvest expenses, and consumption needs',
    'Simplified application process and zero processing fee for limits up to ₹3 lakh',
    'Farmers, self-help groups, joint liability groups, and tenant farmers',
    'Soil Health Card Scheme',
    'Detailed soil testing report provided every 2 years',
    'Crop-wise recommendations for nutrients and fertilizers',
    'Helps reduce cultivation cost by preventing excess fertilizer use',
    'Improves long-term soil fertility and crop yield',
    'All farmers across India',
    # State schemes
    'Mukhyamantri Krushi Udyog Yojana',
    'Rythu Bandhu Scheme',
    'Jalyukt Shivar Abhiyan',
    'Krushak Assistance for Livelihood and Income Augmentation (KALIA)',
    'Bhavantar Bhugtan Yojana',
    'Mukhyamantri Kisan Sahay Yojana',
    'YSR Rythu Bharosa',
    'Chief Minister\'s Krishi Rinn Yojana',
    'Mukhya Mantri Krishi Ashirwad Yojana',
    'Saur Sujala Yojana',
    'Rajiv Gandhi Kisan Nyay Yojana',
    'Mukhyamantri Krishi Ashirwad Yojana',
    'Kisan Karz Mafi Yojana',
    'Krishi Yantra Subsidy Yojana',
    'Pashudhan Bima Yojana',
    'Financial assistance up to ₹50 lakh for setting up agro-based industries.',
    'Promotes entrepreneurship in agriculture and allied sectors.',
    'Investment subsidy of 40% for general category and 50% for SC/ST/Women.',
    'Farmers, FPOs, and agricultural entrepreneurs in Odisha.',
    '₹5,000 per acre per season to support farm investment.',
    'Direct transfer before Kharif and Rabi seasons.',
    'Helps purchase seeds, fertilizers, and pesticides without taking loans.',
    'All land-owning farmers in Telangana.',
    'Aims to make Maharashtra a drought-free state.',
    'Deepening of rivers, construction of farm ponds, and check dams.',
    'Improves groundwater levels and provides irrigation during dry spells.',
    'Farmers in drought-prone areas of Maharashtra.',
    '₹25,000 over five seasons for small and marginal farmers.',
    '₹12,500 for landless agricultural households for allied activities.',
    'Life insurance cover of ₹2 lakh and additional accident cover.',
    'Small, marginal, and landless farmers in Odisha.',
    'Compensates farmers if crop selling price falls below Minimum Support Price (MSP).',
    'Reduces distress selling by farmers.',
    'Covers major crops like soybean, maize, and pulses.',
    'Farmers in Madhya Pradesh registered under the scheme.',
    'Free crop insurance scheme replacing PMFBY in the state.',
    'Compensation for crop loss due to drought, heavy rain, or unseasonal rain.',
    'No premium required from farmers.',
    'All farmers in Gujarat.',
    '₹13,500 per year per farmer family (includes ₹6,000 from PM-KISAN).',
    'Supports tenant farmers and those cultivating forest land.',
    'Includes free crop insurance and interest-free crop loans.',
    'Farmers and tenant farmers in Andhra Pradesh.',
    'Zero interest crop loans up to ₹3 lakh.',
    'Interest subvention provided by the state government.',
    'Encourages formal credit and prevents exploitation by moneylenders.',
    'Farmers in Arunachal Pradesh.',
    '₹5,000 per acre per year (up to 5 acres).',
    'Direct financial support for agricultural operations.',
    'Complements the PM-KISAN scheme.',
    'Small and marginal farmers in Jharkhand.',
    'Subsidized solar irrigation pumps for farmers.',
    'Reduces dependency on grid electricity and diesel pumps.',
    'Promotes clean energy in agriculture.',
    'Farmers in Chhattisgarh.',
    'Input assistance to crop-producing farmers to ensure fair returns.',
    'Covers paddy, maize, and sugarcane.',
    'Encourages crop diversification.',
    'Waiver of agricultural loans up to ₹1 lakh.',
    'Provides relief to debt-ridden farmers.',
    'Improves creditworthiness for future loans.',
    'Eligible farmers in Uttar Pradesh/Punjab/Rajasthan (varies by state).',
    'Subsidy up to 50% on agricultural machinery and equipment.',
    'Promotes farm mechanization and efficiency.',
    'Includes tractors, rotavators, and seed drills.',
    'Farmers purchasing approved machinery.',
    'Insurance cover for cattle and livestock against death or permanent disability.',
    'Subsidized premium rates for farmers.',
    'Protects dairy and livestock farmers from financial ruin.',
    'Livestock owners and dairy farmers.'
]

langs = ['hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'or']
translations = { 'en': { s: s for s in strings_to_translate } }

print("Translating strings...")
for lang in langs:
    print(f"Translating to {lang}...")
    translations[lang] = {}
    translator = GoogleTranslator(source='en', target=lang)
    for s in strings_to_translate:
        try:
            translations[lang][s] = translator.translate(s)
        except Exception as e:
            print(f"Error translating {s} to {lang}: {e}")
            translations[lang][s] = s

with open('Frontend/src/data/schemesTranslations.js', 'w', encoding='utf-8') as f:
    f.write("export const schemeTranslations = ")
    json.dump(translations, f, ensure_ascii=False, indent=2)
    f.write(";\n")
print("Done!")
