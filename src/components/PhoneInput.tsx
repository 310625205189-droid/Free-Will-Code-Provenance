import React, { useState } from 'react';
import { AsYouType, isValidPhoneNumber, getCountries, getCountryCallingCode, CountryCode } from 'libphonenumber-js';
import { Phone } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: CountryCode;
  required?: boolean;
}

const countries = getCountries();

const countryNames: Partial<Record<CountryCode, string>> = {
  IN: 'India',
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  SG: 'Singapore',
  AE: 'UAE',
  NG: 'Nigeria',
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  defaultCountry = 'IN',
  required = false,
}) => {
  const [country, setCountry] = useState<CountryCode>(defaultCountry);
  const [touched, setTouched] = useState(false);

  const isValid = value === '' ? !required : isValidPhoneNumber(value, country);
  const showError = touched && !isValid;

  const handlePhoneChange = (raw: string) => {
    const formatted = new AsYouType(country).input(raw);
    onChange(formatted);
  };

  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
        Phone Number {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="flex gap-2">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value as CountryCode)}
          className="w-32 shrink-0 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs px-2 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 focus:border-[#9b51e0] focus:ring-2 focus:ring-[#9b51e0]/20 outline-none transition-all"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {countryNames[c] ?? c} (+{getCountryCallingCode(c)})
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="tel"
            value={value}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Phone number"
            className={`w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${
              showError
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-200/80 dark:border-slate-700 focus:border-[#9b51e0] focus:ring-2 focus:ring-[#9b51e0]/20'
            }`}
          />
        </div>
      </div>
      {showError && (
        <p className="text-rose-500 text-[11px] font-medium mt-1.5">
          Enter a valid phone number for {countryNames[country] ?? country}
        </p>
      )}
    </div>
  );
};

export function isPhoneValid(value: string, country: CountryCode, required = false): boolean {
  if (value === '') return !required;
  return isValidPhoneNumber(value, country);
}