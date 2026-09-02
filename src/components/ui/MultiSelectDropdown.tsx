"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X, Search, Globe, Users, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OptionItem {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
}

interface MultiSelectDropdownProps {
  label?: string;
  options: (string | OptionItem)[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  allowCustom?: boolean;
  className?: string;
}

export function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  hint,
  error,
  icon,
  allowCustom = true,
  className,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options to OptionItem[]
  const normalizedOptions: OptionItem[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()) ||
    opt.value.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter((v) => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  const handleRemove = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v !== val));
  };

  const handleAddCustom = () => {
    const trimmed = search.trim();
    if (trimmed && !selectedValues.includes(trimmed)) {
      onChange([...selectedValues, trimmed]);
      setSearch("");
    }
  };

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const allVals = normalizedOptions.map((o) => o.value);
    onChange(allVals);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className={cn("w-full space-y-1.5 font-sans text-left relative", className)} ref={dropdownRef}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#0A0A0E] tracking-tight">
            {label}
          </label>
          {selectedValues.length > 0 && (
            <span className="text-[10px] font-mono font-bold text-[#5A5A68]">
              {selectedValues.length} selected
            </span>
          )}
        </div>
      )}

      {/* Trigger Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "min-h-[48px] w-full rounded-2xl bg-[#F8F8FC] border border-black/10 p-2 text-sm text-[#0A0A0E] cursor-pointer transition-all flex items-center justify-between gap-2",
          "hover:bg-white hover:border-[#FFD21F] focus:outline-none focus:ring-2 focus:ring-[#FFD21F]/30 shadow-2xs",
          isOpen ? "border-[#FFD21F] bg-white ring-2 ring-[#FFD21F]/20" : "",
          error ? "border-red-500 bg-red-50/30" : ""
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          {icon && <div className="text-[#7A7A8A] pl-1.5 shrink-0">{icon}</div>}

          {selectedValues.length === 0 ? (
            <span className="text-xs text-[#8A8A98] px-2 select-none">
              {placeholder}
            </span>
          ) : (
            selectedValues.map((val) => {
              const opt = normalizedOptions.find((o) => o.value === val);
              const displayLabel = opt ? opt.label : val;
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] shadow-2xs group"
                >
                  <span className="truncate max-w-[160px]">{displayLabel}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemove(val, e)}
                    className="p-0.5 rounded-md hover:bg-black/10 text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 pr-1 text-[#7A7A8A]">
          <ChevronDown
            className={cn("w-4 h-4 transition-transform duration-200", isOpen ? "rotate-180 text-[#0A0A0E]" : "")}
          />
        </div>
      </div>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-2xl bg-white border border-black/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col max-h-72">
          {/* Search bar inside dropdown */}
          <div className="p-2.5 border-b border-black/8 bg-[#FAFAFC] flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#7A7A8A] shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search or type to add..."
              className="w-full bg-transparent text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" && allowCustom && search.trim()) {
                  e.preventDefault();
                  handleAddCustom();
                }
              }}
            />
            {search && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearch("");
                }}
                className="p-1 text-[#7A7A8A] hover:text-[#0A0A0E]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick actions bar */}
          <div className="px-3 py-1.5 border-b border-black/5 bg-[#F5F5F9] flex items-center justify-between text-[10px] font-bold font-mono">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[#0A0A0E] hover:underline"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[#7A7A8A] hover:text-red-600 hover:underline"
            >
              Clear
            </button>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto divide-y divide-black/5 flex-1 p-1">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center space-y-2">
                <p className="text-xs text-[#7A7A8A]">No standard options matching &ldquo;{search}&rdquo;</p>
                {allowCustom && search.trim() && (
                  <button
                    type="button"
                    onClick={handleAddCustom}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-bold shadow-xs hover:bg-[#FFE052]"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add &ldquo;{search.trim()}&rdquo;</span>
                  </button>
                )}
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(opt.value);
                    }}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-xl text-left text-xs transition-colors flex items-center justify-between gap-2",
                      isSelected
                        ? "bg-[#FFFDF5] text-[#0A0A0E] font-bold"
                        : "hover:bg-black/5 text-[#4A4A58]"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors",
                          isSelected
                            ? "bg-[#FFD21F] border-black/20 text-[#0A0A0E]"
                            : "border-black/20 bg-white"
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="min-w-0">
                        <span className="block truncate">{opt.label}</span>
                        {opt.description && (
                          <span className="block text-[10px] text-[#7A7A8A] font-normal truncate">
                            {opt.description}
                          </span>
                        )}
                      </div>
                    </div>

                    {opt.icon && <div className="text-[#7A7A8A] shrink-0">{opt.icon}</div>}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <p className="text-[11px] font-semibold text-red-600">{error}</p>}
      {hint && !error && <p className="text-[11px] text-[#6A6A78]">{hint}</p>}
    </div>
  );
}
