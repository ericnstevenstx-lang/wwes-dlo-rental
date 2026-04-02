"use client";

import { useState, useEffect, useCallback } from "react";

const WWES_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCADIAMgDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUHBAYIAwIB/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAEEAgMFBv/aAAwDAQACEAMQAAAB6pAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAgAAAAiYaJ0df62/K0HHbZDXdiscgJ1AAAAAAAAAVf4/c/z/Z8/SlzwdXv6tftX2lf8iFvzYAAAAAAAAERXdttPTrmJtTIwsxcoWOME4AAAANK3XnSVibByPsp1T78KWMXtm0dUJ1h6UNAHVkpzfpZ1NtvLFfne1PbxyCdR7vzRpJ2lH8iXUb7Lcqyh0jJcU9Rm+iDEyxG+mcITNzhg4c1qkpv54/3A6R/Ob5su/wAan0A6xha6qQ6s86Gvg9fyTQjvTNEb9SAAAAAQ0yKUk7YSq3c58VlHW8K0jbdFWbvOAIAAAAAAAAAAAAAAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//xAAnEAACAgIBAwIHAQAAAAAAAAAEBQMGAQIUBxUWEkAAEBETFzBwIf/aAAgBAQABBQL+Qntg1evnqj1ANBGentbI7ynEU1KLTPFh9Dap6YyiYysgPaSY5196gGEQAiPGW42zKRD8V5QWeXrrjTX2bbfs9vtYpLFetQQVpfXKXoFlFv3e0e0aq4XAULNnVsefKfROezteFq6FUH7bjxer9ri2gomDK/K1TaKxCTPdGQkm/Kh+75eJ5K8swSEKS/rYNGt+Vp2hFqEgZrXMTEHzIHNj3YCx7/X/ADTqomk+CLyEMZKcNBvsTDpEQ4DGFS2he+ELaQihgN4TgISoSPn1hFzxnEOXCYKeVupMwDrXD0+j7qfx+H1WFwDtW7UJ9aK3iy7TJZtnQRmd/wAfKNQNOpCsbQ8OsQbDVymmbCSWST7tsJj1Js1hE3BrE62slIEgA+OmquvwwdPmudvB61FX49/kSJAZH2wPjQAjCxRo1sMmARsE8EblbpF0u+4Asg/bA8DRLhYIe2B8eJSAJJ2pWXtHHpDH2BZ8ZWB52nUAlSZWB7DwrAxtdVomg+Ah8DZWB5HFXihZ/RalpDdBUglcTdneWmXjC+OIqq/eWlUi3tJTlistZaiixlvVqHHUB3oFaLU8VWRRmXZb+5uv3ZgfjGGc+eg694bUXDtY5TxOlFfoo1fEj6bh614OmbQjL6FMrifUfZ/KkUxIlf8AT//EAC0RAAECAgcGBwEAAAAAAAAAAAECAwQSAAURITFBURMiMGGBoRQyUGCRwdHw/9oACAEDAQE/AfTGIRpLPiYtRCTgBir8HOiRVsQZEzNnUkKHW4Ed6OtKYcLa8Rw2lpRFwTyvJKMcLrZvg30XXVXK2q5NwZZrP0n+5Ur19x2IAXdcLsk232cOGjdkgsOonb00OoOVExsJDmeGY3tVGazpYO9FrU4orWbSfcP/xAAiEQACAQMEAgMAAAAAAAAAAAABAhEAEiEDBDAxEyNQYLH/2gAIAQIBAT8B+MZzdYnde1c90puEjjIJTUUdzQ2+qIE5/K2ygLjjfTk3KYNeN2w7YoCBA+w//8QAQRAAAQMCBAMDBgsGBwAAAAAAAQIDBAARBRITIRQiMUFRYQYzcYGR0RUjJDAzQKGx4fDxEFJTcHLBNUJDk8LS4v/aAAgBAQAGPwL+UOaVIQz3A9T6qtquW79M1mivoeHbbqPV9WSGU6kt85GUeNcVify6cvdRc3SmsmijL+7l2rjMK+RTkbgN7JX4UlyQwuPITyrQpJG/ePqqEr3TFj5kjx/KqYbj6ibqzrW3fYDx9dcDHcdW48vdQUSs+AogylysR7buEts/9lfZTa8RnPtanOljVOdwd/gKCRsB9Uhzl7R5LegtXcfzakwoqbqfWApR6JSN/dTrjCDImZDz23Ue4UJeIWeledk6pR7zWI4ineO2nQbV3/m32/VVxnxyq6EdUnvrQxCOubDTsiUzuQPGr53b/u6e9aENhcCArz5DvnKHhTcZgWQn2nx+r5tNGbvt89HhytUOP2ylKbp62pWHPl3XSUglKOXf9afwlOfimUaizblA27fWKCESmVKPRIcF6LeqjUHVGbekYKG3TIWMwcFsnm5u+nJDy9XTIBaaIK+vdesPU6l9HGpC2+Qd9t96VAkF3XTYHKi4F/1qVACHnZMZnWWlCR028fEVxRQuK3my2kWLfS/W9FKpLKVDqCsVeuVEtXoa/GsLjlmQVYgEKaOUbZjYX3rK5IabV3KWBQcU6hLZ6LKtqekGQ2ptpOZWVQNLkR3cqEKynV5T2e+lyB8oSlOYJZIJV6KTLUFRW1G1pBAP30dJ5DtuuRV/24bMTsW3FN39O4+41O8oMtlO4hkF+oRl/SvK7GACFuoS2P6b832WrBlRSn4U1HNbIefzuWpkN911lC0DMWTY/RCorDVzpMZE367RzWKKkFPwnqt6Wc81r81eTUsdWwW7+nf8A41iOPlPMuelAv2Jy/imvK/F1jdcXTF/6fwFYda+nxrl/Tbb+9YeMLycNk2yG4vpG9T2n3ILElS0nXmulK07722qA0p1DxSyBqNm6SOy1SsuNpwW4TupnU1OteSS+I4u6WDr2tqfGedavKBuSYiVrW6lLk1wpyc2xT415PsrkNyY2q8dRhWZHUf8AqsWGGIjO5GC4rSUTYhKsp++sZmaY4or0tTty3bNqlYvrPKkPRVtZFK5EjV7PZXk8N9HWfzenNt/envgXh89hqaKr7dn7cj7Lb6L3yuJzCuH4VjQvfS0xl9lKbZjtNNq6oQgAGg43h8VCxuFJZSCKMkR2uIP+rkGb21xPDtcR/FyDN7aK1wIy1HcqLKbmksLjMqYT0aKBlHqox+FY0Cb6WmMvspbLcZltpfnNpbASr0iuH4VjQvfS0xl9lB1uHGZWn/OlpIIpTnBxHlE7r0knekoQkIQkWCUiwFf4dE/2E+6mlGKwVNWDZ0xyejuouPQo7rh6qW0CaEcxGCwk3DWmMo9VOJaiMNJcFlhDYGYeNKjpispYVuWg2Mp9VcOGGhH/AIWQZfZQjmIxoA3DWmMvspRjxmWCrrpICb/My4kR3SfcTym9r79PXXwfjkd6NOS58W5nsM3cffWLsN4g3Bai5w0jh8+oUm1vXWHTEupalOPONuK0xzW6bVx7xairMjLpoSlYCCnb7QfbS2oy08EjCzJfQUA3UUdPtFPSoyWWn1z9EFDQAAyA9PVT2LS8Ralo4TVQwGAmyiBbeo8oYiiQ4pZzxeGHKPTauHXIGHYc59E9oBwWt1pgvSUTXCm5fbFkr8R8+uO3KdhKVb45g2UN6alTcUmTVII+lNybdl6lYhDxOVAdkElYat29aixJeIyHVMKUrWUAVKvT0B0kIcSBmHUeNT2UPrdMtGmpah5osffTmFKkuqQp/iA7YXSq1qdiyMWlzIi2CxouWskd49FJajY7NaZSb6abWp3XxaSI6lZhHsClPopiCypS22hspfU73/mh/8QAKRABAAICAQMCBQUBAAAAAAAAAREhADFRQWGRcYFAobHB0RAwcPDx4f/aAAgBAQABPyH+ISYB2Z9IW4fR5PziMo0fk2Pf4bUIWzPKO0numeuhzOA0x/kYvJ0dPyZOX6nENE+Ocdgmlrk6Pwo7Ud1Lr/XQy8a4JEiEal+TE86FAtN0NtZAJqCP5gPDvhZwsd6xE/n6YbMKA+EC6YnXTn+9OaKzGuivqerDcpJzj0XQmPvkrWYKxuX/AA+uaht0jqU8n2/CzWLvRAd8M1HDgQfmPVx3t3H/AB88T1xLHBH48mRsXt29V3fh4PHOfP7x3Brem5nnIsGsISJc9mSAeHtXVkyDoSp9JyCj0wI1OvTNLEs2T3to4wjlluMNhhwecpA7hS8kqRpQolzwMXYSJKqBRf1MhsSSOR6h88itWeonmaOMXO0DkfScAwMm5MkK/cbgozwAO+yL3E4oMduPC5rS0A/fENimyAWC9sMGTncGIRtE6peM3IFaEGyDC8451EJkYuEdOcXDWgY+P1NbIHsMJBPvqVPmn2xlUKboh44lfXRTlOlRGRVDNeFiUSPbAqABd0AnxjxJsHaDr3xRcIB2w+rFKjkLF/fwYpAme205lOz2NOD2PrruV1nD2GEdJpQzYzzhKl1GrLqRGNtpPSDtH3xmi2jH8gncYPapWpiAZBED0wc+cteNgs+7FugaUY19HABuK/5YvD4s5HisSXPfVySGSnqj6MsbSur2tL6/qCMYBycw5B5KnzSMlCO1TwyBdY4h5aHIhgsFSZNR0zqsWCQ64mOmdVjCbkROVjNvRLelCDAAKZEt5pE5wUToIoIcAim8p80icnjilZbsKrN0tTN7mN4IekIHAfoyBSKEoLCunbNlBG3umTGCKW5IR1cjhAr8ECy3eN4uEXq2EOjxlPoSNGZ6I3iME4Q3mkZTjR+6IP2YdGcICt6QI98DgXIrxB+utGcVM8ecInDDBtrNFgCaKpEG+mFq7CiTlnANNMQrI1Pb7OXQ/HxWBC6Xm7dADDRsJ98FVUZQtKbT2sydGDoxWm29nTjmEaI8ywCtR++22kUWGnvEZPS5WBSSSxg6MYKVNuFvO0Ze4D6ZCvclgiD3DIT/AI4wlf1oylblETrpInzhfDDBAB3IVkG/uJvLmzGeH6sURIRMiT5X+UP/2gAMAwEAAgADAAAAEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPvvvvrh/fvvvvvvvvvqkxvvvvvvvvvvnv/8A77777yZRTabYh5CAD7556gSShhB54777767yyyzz77777777777777777zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz/8QAHhEBAAICAgMBAAAAAAAAAAAAAREhMUEAUTBQYWD/2gAIAQMBAT8Q9YEQyEFjKTQYVN0CzFqlRKOqmfSmYjhTWowyV0lJ078Y6iStAkE/ZIbrvhYAYgAPzOwAmYkQavAuhkgIMBlBBW5nBAeKHJGZKPQrWnI7HkkkcQy7AamrE3HH6KVXKuV/Q//EACYRAAMAAAMHBQEAAAAAAAAAAAABESExURAgMEFhgZFAUKHB0fD/2gAIAQIBAT8Q9VSlKUpSlKUpd5+Gpm3kv19BtdRdEmn2xdEoynw+cQZZ4yeVgeSjkn2/7qN7xYvHWYXhwuoNVo1zGn2BKXvX8CFIiW/CEIQmyEJvwhCcK7L73//EACUQAQEAAgICAgEFAQEAAAAAAAERACExQVFhcYFAEDBwkbHh8f/aAAgBAQABPxD+ITNDVQeSP1DiLBUv78n+MiGdh04tPoH4x/edQ8F9jgdg7UookUqd/wBCpCaDK0Z2aXjSYh3shqbeScNFcBGjaYGlA0EUkTmNKyv4gs195WGvnT/li6uVwiOFUbcxeilcCCpxOTWoCIV7uIJSK9hV8zUNBcIaJSLyx8GnJSzusAgb/EVHqiB2XAW99L1lFCkUnh+hCtMHE1hPYRV5Q9KZrdSbRF2OAd3g8VDBet30Wrs/ofiiJwE6Hk9C/Yo6XDPzpCaS8EI0dDMDOTZ+lcORI1K5J0lEbeElFu+63p2ntNv0EAPxyaK7G/50v7xmCfAMbhIK6YI4HNUkp02BTWt+MgKtAFCvZNU79Z6PLpKBS+sXU1MmlFuhy443i5bycpHm2WuadbzTtRGrXgFrUgOP+aCHpYECssEcD6XIVdN0h1rHuscMSmWSGFGzEi0R1G1jt1y9YXnH/O4jcKa5T5z1jhV8qhweByEonkxUucUX5mdVAM9gigqBB5dYSWBF47KByA4dnPEbG/OPW7dfKGweYTWDGetPJaUsxarMa4jI9eqAKgLLcEynRJ2buki14w/lihF4Wmfqa7zCLtXpY+XCcxYaAlOIhGX0zjmZ5SJODaDUuHGsWstxP0ZdzvFTCHktuAkRVNYjfzxBmgBWLAL0ZrFBU27ZnakXGyc2spt9MvlwNbguO6caDNX0zsD6EWP0f3YxYRJbOx7mv3mzg6uOypeWj3gBQgbBNKOSIxZ3shthB4JhrGLphNDoE777+OXFWHqaPL+CzGmuedwEwRI8YTWFcMxU2CTTrjin3u4BiiPu3BG9mUBucnquCEQNMM25Fbleb1BiwK1XPuo+8Pyryi0Um/8AX6gDAUhEAKUFL7cGCTobLvlLuy4x/EvEIYUAacEwHFyVWgFH2YBHI2US7Ohy4AwMtxXJxnknlwzjHdXV4aotV7ceZYtaWK6FZDtyYcjVI1uUDZdGVv1uMpAoEaOtYrCoGz/3iXAjsNIoQV2I74XFGYVJ21uVW7bvCDaWHIAAANAa/QQ7cZ52psFsIjxkj2kfyFasCc4ppDMlVTBqUO3zmtumRkkBIJRt854SYVBOjuTp4MZNKRLJHVUqTluKYY1LVRqNVoXb5wWCCXBwIqFefP7KACNgiR2EN47apgQQw8E40oEFAcEVtI7X7fzUtFkxM0SYNYSyWCzKPi3lqAxCKtU6kBmbZpzEgb73Npcuo6H0ju6B0+iWPXpOydtCa26zjl+USEARIyhu8b3n1XYQKDhNGxExA/Skp0mKGvF/fR1eSyQEQCW+Fx5IPQMsi10eWIty4VDCCQgYdGx7wtoa0+q6ggToxu7AyOY6orJw/moEJru759GHCNMRIQwRv/Jieh4GCAwooTfDj12C2ME9vPy4uFMhkQBsTe/bgHz5KYoAWIDRDr+UP//Z";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BACK_CHARGE_ITEMS = [
  { id: "missing_cable", label: "Missing 4/0 cable w/ camlocks 50'", price: 630 },
  { id: "damaged_cable", label: "Damaged 4/0 cable w/ camlocks", price: 630 },
  { id: "missing_whip", label: "Missing whip/pigtail w/ camlock and ferrule", price: 125 },
  { id: "damaged_whip", label: "Damaged whip/pigtail w/ camlock and ferrule", price: 125 },
  { id: "replace_ferrule", label: "Replace damaged or missing ferrules on whips/pigtails", price: 10 },
  { id: "replace_male_camlock", label: "Replace Male Camlock", price: 65 },
  { id: "replace_female_camlock", label: "Replace Female Camlock", price: 65 },
  { id: "replace_d_ring", label: "Replace D Ring Cable Strap", price: 12 },
  { id: "damaged_tote_large", label: "Damaged or Missing Collapsible Tote (Large DLO)", price: 500 },
  { id: "damaged_tote_small", label: "Damaged or Missing Collapsible Tote (Small Whip/Pigtail)", price: 300 },
  { id: "missing_lid_large", label: "Missing or Damaged Lid (Large DLO)", price: 125 },
  { id: "missing_lid_small", label: "Missing or Damaged Lid (Small Whip/Pigtail)", price: 100 },
  { id: "labor_sort", label: "Labor to sort, count, rollup, rebox, or resort (per tote)", price: 75 },
] as const;

type ChargeMap = Record<string, number>;

interface FormState {
  checkoutDate: string;
  invoiceNumber: string;
  dloQty: string;
  dloWeights: string;
  maleWhipsQty: string;
  maleWhipsWeights: string;
  femaleWhipsQty: string;
  femaleWhipsWeights: string;
  wwesRepCheckout: string;
  checkoutDeficiencies: string;
  renterSignatureCheckout: string;
  // Customer info
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  employeePickup: string;
  wwesAccountNumber: string;
  checkInDate: string;
  visualDeficiencies: string;
  dloQtyReturn: string;
  dloWeightsReturn: string;
  maleWhipsQtyReturn: string;
  maleWhipsWeightsReturn: string;
  femaleWhipsQtyReturn: string;
  femaleWhipsWeightsReturn: string;
  knownDeficiencies: string;
  renterSignatureCheckin: string;
  wwesRepCheckin: string;
  backChargeNotes: string;
  chargeInvoice: string;
  wwesSupervisor: string;
  charges: ChargeMap;
  acceptedTerms: boolean;
}

const EMPTY_FORM: FormState = {
  checkoutDate: "",
  invoiceNumber: "",
  dloQty: "",
  dloWeights: "",
  maleWhipsQty: "",
  maleWhipsWeights: "",
  femaleWhipsQty: "",
  femaleWhipsWeights: "",
  wwesRepCheckout: "",
  checkoutDeficiencies: "",
  renterSignatureCheckout: "",
  companyName: "",
  companyAddress: "",
  companyEmail: "",
  employeePickup: "",
  wwesAccountNumber: "",
  checkInDate: "",
  visualDeficiencies: "",
  dloQtyReturn: "",
  dloWeightsReturn: "",
  maleWhipsQtyReturn: "",
  maleWhipsWeightsReturn: "",
  femaleWhipsQtyReturn: "",
  femaleWhipsWeightsReturn: "",
  knownDeficiencies: "",
  renterSignatureCheckin: "",
  wwesRepCheckin: "",
  backChargeNotes: "",
  chargeInvoice: "",
  wwesSupervisor: "",
  charges: Object.fromEntries(BACK_CHARGE_ITEMS.map((i) => [i.id, 0])),
  acceptedTerms: false,
};

interface Submission {
  id: string;
  created_at: string;
  total_charges: number;
  [key: string]: unknown;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(n: number) {
  return "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ------------------------------------------------------------------ */
/*  Legal Terms                                                        */
/* ------------------------------------------------------------------ */

const LEGAL_SECTIONS = [
  {
    title: "1. Equipment Description and Condition",
    body: `The equipment covered under this Agreement consists of 4/0 AWG DLO (Diesel Locomotive Cable) temporary power cable assemblies with cam-type (Camlock) connectors, associated whips/pigtails with ferrule terminations, D-ring cable straps, and collapsible bulk tote containers with lids (collectively, "Equipment"). All Equipment is rented on an as-is, where-is basis following mutual inspection at check-out. The Renter acknowledges that the Equipment has been made available for inspection prior to acceptance and that any deficiencies not noted on this Agreement at the time of check-out shall be presumed to have occurred during the rental period.`
  },
  {
    title: "2. Inspection Obligations",
    body: `Renter shall visually and electrically inspect all Equipment upon receipt and prior to each use. Inspection shall include, at minimum: (a) examination of cable jacket integrity for cuts, abrasions, crush damage, or chemical exposure; (b) verification of Camlock connector housing integrity, pin/socket condition, and locking mechanism function; (c) continuity and insulation resistance testing per NFPA 70E and applicable jobsite requirements; (d) inspection of ferrule crimps on whip/pigtail assemblies; and (e) verification of cable color-coding and phase identification. Renter shall immediately remove from service and report to WWES any Equipment that fails inspection or shows signs of overheating, arcing, moisture intrusion, or mechanical damage.`
  },
  {
    title: "3. Proper Use and Regulatory Compliance",
    body: `Renter shall use Equipment solely for its intended purpose as temporary electrical power distribution cable and in strict compliance with all applicable codes, standards, and regulations, including but not limited to: the National Electrical Code (NEC/NFPA 70), NFPA 70E Standard for Electrical Safety in the Workplace, OSHA 29 CFR 1926 Subpart K (Electrical Safety in Construction), and all state and local electrical codes. Equipment shall not be subjected to loads exceeding its rated ampacity, shall not be used in environments exceeding its rated temperature or voltage, and shall not be dragged across sharp edges, exposed to vehicular traffic without proper protection, submerged in water, or exposed to corrosive chemicals. Cable connections shall be made and broken only in a de-energized state unless proper hot-work procedures are followed per NFPA 70E. Renter shall ensure that only qualified electrical personnel (as defined by OSHA and NFPA 70E) handle, connect, energize, de-energize, and disconnect the Equipment.`
  },
  {
    title: "4. Assumption of Risk",
    body: `Renter acknowledges that DLO cable and associated Camlock connectors are used in high-amperage temporary power applications that carry inherent risks of electrical shock, arc flash, arc blast, burns, fire, and death. Renter expressly assumes all risks associated with the possession, transportation, handling, installation, energization, use, de-energization, removal, and return of the Equipment. This assumption of risk extends to Renter's employees, agents, contractors, subcontractors, and any other persons who may come into contact with the Equipment during the rental period.`
  },
  {
    title: "5. Indemnification",
    body: `Renter shall defend, indemnify, and hold harmless WWES, its owners, officers, directors, employees, agents, and affiliates (collectively, "WWES Parties") from and against any and all claims, demands, actions, causes of action, damages, losses, liabilities, judgments, settlements, penalties, fines, costs, and expenses (including reasonable attorneys' fees and court costs) arising out of or related to: (a) Renter's possession, use, or misuse of the Equipment; (b) any injury to or death of any person arising from or related to the Equipment during the rental period; (c) any damage to property arising from or related to the Equipment during the rental period; (d) any violation of applicable laws, codes, or regulations by Renter; or (e) any breach of this Agreement by Renter. This indemnification obligation shall survive the termination or expiration of this Agreement.`
  },
  {
    title: "6. Insurance Requirements",
    body: `Renter shall maintain, at its sole cost and expense, throughout the rental period: (a) Commercial General Liability insurance with limits of not less than $1,000,000 per occurrence and $2,000,000 general aggregate; (b) Workers' Compensation insurance as required by applicable state law; (c) Employer's Liability insurance with limits of not less than $1,000,000 per accident; and (d) property/inland marine insurance sufficient to cover the full replacement value of all rented Equipment. WWES shall be named as an additional insured on Renter's Commercial General Liability policy and as a loss payee on Renter's property/inland marine policy. Certificates of insurance evidencing the above coverages shall be provided to WWES prior to or at the time of Equipment check-out. Renter's obligation to maintain insurance shall not limit Renter's indemnification obligations under this Agreement.`
  },
  {
    title: "7. Loss, Damage, and Back Charges",
    body: `Renter shall be responsible for all loss of, theft of, or damage to the Equipment from the time of check-out until the time of verified check-in by a WWES representative. Equipment shall be returned in the same condition as received, ordinary wear and tear excepted. Back charges for missing, damaged, or improperly returned Equipment shall be assessed at the rates specified in the Back Charges schedule of this Agreement. "Ordinary wear and tear" does not include damage caused by overloading, improper connections, dragging, crushing, chemical exposure, moisture intrusion, failure to protect cable runs, or any use not in accordance with the manufacturer's specifications and applicable codes. WWES's determination of Equipment condition at check-in shall be final, subject to the dispute resolution provisions herein. Labor charges for sorting, counting, re-rolling, re-boxing, or resorting Equipment that is returned in disorganized condition shall apply per the posted rate per tote.`
  },
  {
    title: "8. Title and Ownership",
    body: `The Equipment is and shall remain the sole and exclusive property of WWES. Renter acquires no ownership interest in the Equipment. Renter shall not pledge, encumber, sublease, or permit any lien to attach to the Equipment. Renter shall keep the Equipment free and clear of all levies, liens, and encumbrances. Renter shall immediately notify WWES if the Equipment is subject to any claim, levy, lien, or legal process.`
  },
  {
    title: "9. Payment Terms",
    body: `Rental fees are due and payable per the terms of the associated invoice. Back charges assessed at check-in are due net 30 days from the date of the back charge invoice unless otherwise agreed in writing. Amounts not paid when due shall accrue interest at the rate of 1.5% per month (18% per annum) or the maximum rate permitted by applicable law, whichever is less. Renter shall be responsible for all costs of collection, including reasonable attorneys' fees, incurred by WWES in collecting past-due amounts.`
  },
  {
    title: "10. Limitation of Liability",
    body: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WWES BE LIABLE TO RENTER OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, LOST REVENUE, BUSINESS INTERRUPTION, COST OF SUBSTITUTE EQUIPMENT, OR LOSS OF DATA, ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE EQUIPMENT, REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE), EVEN IF WWES HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. WWES'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE TOTAL RENTAL FEES PAID BY RENTER UNDER THE ASSOCIATED INVOICE. THIS LIMITATION SHALL NOT APPLY TO CLAIMS ARISING FROM WWES'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT.`
  },
  {
    title: "11. Force Majeure",
    body: `Neither party shall be liable for delays or failures in performance resulting from causes beyond its reasonable control, including but not limited to acts of God, fire, flood, earthquake, pandemic, epidemic, war, terrorism, civil unrest, labor disputes, government actions, power failures, or transportation disruptions. The affected party shall provide prompt written notice and use commercially reasonable efforts to mitigate the impact of such event.`
  },
  {
    title: "12. Governing Law and Dispute Resolution",
    body: `This Agreement shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of laws principles. Any dispute arising out of or related to this Agreement shall first be submitted to good faith negotiation between the parties for a period of not less than 30 days. If the dispute is not resolved through negotiation, it shall be resolved by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules, with the arbitration to be conducted in Rockwall County, Texas. The prevailing party in any arbitration or litigation shall be entitled to recover its reasonable attorneys' fees and costs.`
  },
  {
    title: "13. Severability",
    body: `If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties' original intent.`
  },
  {
    title: "14. Entire Agreement",
    body: `This Agreement, together with the associated rental invoice, constitutes the entire agreement between the parties regarding the rental of the Equipment and supersedes all prior or contemporaneous oral or written agreements, representations, or understandings. No modification or amendment of this Agreement shall be effective unless in writing and signed by authorized representatives of both parties.`
  },
  {
    title: "15. Safety Warnings",
    body: `WARNING: DLO cable and Camlock connectors are designed for high-amperage temporary power distribution. Improper use, connection, or handling can result in ELECTRICAL SHOCK, ARC FLASH, ARC BLAST, SEVERE BURNS, FIRE, AND DEATH. Only qualified electrical personnel shall handle this Equipment. All applicable lockout/tagout (LOTO) procedures must be followed. Appropriate personal protective equipment (PPE) as determined by an arc flash risk assessment per NFPA 70E shall be worn at all times when working on or near energized Equipment. Never connect or disconnect Camlock connectors under load. Verify de-energized state with a properly rated voltage tester before making or breaking connections. Inspect all Equipment before each use. Do not use damaged Equipment. Report all deficiencies immediately to WWES.`
  },
];

function LegalTerms() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden", background: "var(--surface)" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="no-print"
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 14px", background: "var(--input-bg)", border: "none", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)",
        }}
      >
        <span>View Full Terms and Conditions (15 sections)</span>
        <span style={{ fontSize: 18, lineHeight: 1, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>&#9662;</span>
      </button>
      <div style={{ maxHeight: expanded ? 6000 : 0, overflow: expanded ? "auto" : "hidden", transition: "max-height 0.35s ease", padding: expanded ? "0 14px 14px" : "0 14px" }} className={expanded ? "" : "no-print"}>
        {LEGAL_SECTIONS.map((s) => (
          <div key={s.title}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--accent)", marginTop: 16, marginBottom: 6 }}>{s.title}</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, lineHeight: 1.65, color: "var(--label)", margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase" as const,
        letterSpacing: "0.08em", color: "var(--accent)", borderBottom: "2px solid var(--accent)", paddingBottom: 6, marginBottom: 16,
      }}>{title}</div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", half, textarea }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; half?: boolean; textarea?: boolean;
}) {
  const base: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace", fontSize: 14, padding: "8px 10px",
    border: "1px solid var(--border)", borderRadius: 4, background: "var(--input-bg)",
    color: "var(--text)", width: "100%", boxSizing: "border-box" as const, outline: "none",
  };
  return (
    <div style={{ display: "inline-flex", flexDirection: "column" as const, width: half ? "calc(50% - 8px)" : "100%", marginBottom: 12, marginRight: half ? 16 : 0, verticalAlign: "top" }}>
      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "var(--label)", marginBottom: 4, letterSpacing: "0.02em" }}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} style={{ ...base, resize: "vertical" as const }} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={base} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Form                                                          */
/* ------------------------------------------------------------------ */

export default function DLORentalForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [tab, setTab] = useState<"form" | "history">("form");
  const [saveStatus, setSaveStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // Load existing submissions
  useEffect(() => {
    fetch("/api/submissions")
      .then((r) => r.json())
      .then((data) => { if (data.submissions) setSubmissions(data.submissions); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = useCallback((key: keyof FormState, val: string | boolean) => {
    setForm((f) => ({ ...f, [key]: val }));
  }, []);

  const setCharge = useCallback((id: string, val: string) => {
    const n = Math.max(0, parseInt(val) || 0);
    setForm((f) => ({ ...f, charges: { ...f.charges, [id]: n } }));
  }, []);

  const total = BACK_CHARGE_ITEMS.reduce((sum, item) => sum + item.price * (form.charges[item.id] || 0), 0);

  const handleSave = async () => {
    setSaveStatus("Saving...");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, total }),
      });
      const data = await res.json();
      if (data.error) {
        setSaveStatus("Error: " + data.error);
      } else {
        setSaveStatus("Saved");
        // Refresh history
        const hist = await fetch("/api/submissions").then((r) => r.json());
        if (hist.submissions) setSubmissions(hist.submissions);
      }
    } catch {
      setSaveStatus("Network error");
    }
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleClear = () => setForm(EMPTY_FORM);

  const exportCSV = (entries: Submission[]) => {
    if (!entries.length) return;
    const flat = entries.map((e) => {
      const row: Record<string, unknown> = { ...e };
      delete row.charges;
      BACK_CHARGE_ITEMS.forEach((item) => {
        const charges = (e.charges || {}) as ChargeMap;
        row[`charge_${item.id}_qty`] = charges[item.id] || 0;
        row[`charge_${item.id}_total`] = (charges[item.id] || 0) * item.price;
      });
      return row;
    });
    const keys = Object.keys(flat[0]);
    const csv = [keys.join(","), ...flat.map((r) => keys.map((k) => `"${String(r[k] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dlo_rental_records_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header with Logo + Contact */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16, marginBottom: 16 }}>
          {/* Logo */}
          <div style={{ flexShrink: 0 }}>
            <img src={WWES_LOGO} alt="WorldWide Electric Services" style={{ height: 68, objectFit: "contain" as const, objectPosition: "center 30%" }} />
          </div>
          {/* Contact Info */}
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, lineHeight: 1.7, color: "var(--label)", textAlign: "right" as const }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--text)", marginBottom: 2 }}>3031 Botham Jean Blvd, Dallas, TX 75215</div>
            <div>Phone: <span style={{ color: "var(--text)" }}>469.362.9792</span> &nbsp;|&nbsp; Fax: <span style={{ color: "var(--text)" }}>469.362.9792</span></div>
            <div>Email: <a href="mailto:info@wwesinc.com" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>info@wwesinc.com</a></div>
            <div style={{ marginTop: 2, fontSize: 10, color: "var(--muted)" }}>Mon &ndash; Fri &nbsp; 8:00 AM &ndash; 5:00 PM</div>
          </div>
        </div>
        {/* Title bar */}
        <div style={{ textAlign: "center" as const, borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)", padding: "10px 0" }}>
          <h1 style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>DLO Rental Agreement</h1>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Equipment must be returned in the condition received. Shortages and damage will be back charged.</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="no-print" style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: "1px solid var(--border)", paddingBottom: 8 }}>
        {(["form", "history"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            fontWeight: tab === t ? 700 : 400, color: tab === t ? "var(--accent)" : "var(--label)",
            background: "none", border: "none", cursor: "pointer", padding: "4px 12px",
            borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent", marginBottom: -9,
          }}>
            {t === "form" ? "New Agreement" : `History (${submissions.length})`}
          </button>
        ))}
      </div>

      {tab === "form" ? (
        <>
          {/* ----- CUSTOMER INFO ----- */}
          <Section title="Customer Information">
            <Field label="Company Name" value={form.companyName} onChange={(v) => set("companyName", v)} />
            <Field label="Address" value={form.companyAddress} onChange={(v) => set("companyAddress", v)} />
            <Field label="Email" type="email" value={form.companyEmail} onChange={(v) => set("companyEmail", v)} half />
            <Field label="WWES Account Number" value={form.wwesAccountNumber} onChange={(v) => set("wwesAccountNumber", v)} half />
            <Field label="Employee Picking Up" value={form.employeePickup} onChange={(v) => set("employeePickup", v)} />
          </Section>

          {/* ----- CHECK-OUT ----- */}
          <Section title="Check-Out">
            <Field label="Check-Out Date" type="date" value={form.checkoutDate} onChange={(v) => set("checkoutDate", v)} half />
            <Field label="Invoice #" value={form.invoiceNumber} onChange={(v) => set("invoiceNumber", v)} half />
            <Field label="DLO Qty" value={form.dloQty} onChange={(v) => set("dloQty", v)} half />
            <Field label="DLO Tote Weights" value={form.dloWeights} onChange={(v) => set("dloWeights", v)} half />
            <Field label="Male Whips Qty" value={form.maleWhipsQty} onChange={(v) => set("maleWhipsQty", v)} half />
            <Field label="Male Whips Tote Weights" value={form.maleWhipsWeights} onChange={(v) => set("maleWhipsWeights", v)} half />
            <Field label="Female Whips Qty" value={form.femaleWhipsQty} onChange={(v) => set("femaleWhipsQty", v)} half />
            <Field label="Female Whips Tote Weights" value={form.femaleWhipsWeights} onChange={(v) => set("femaleWhipsWeights", v)} half />
            <Field label="WWES Representative" value={form.wwesRepCheckout} onChange={(v) => set("wwesRepCheckout", v)} half />
            <Field label="Renter Signature" value={form.renterSignatureCheckout} onChange={(v) => set("renterSignatureCheckout", v)} half />
            <Field label="Deficiencies in Condition or Quantities" value={form.checkoutDeficiencies} onChange={(v) => set("checkoutDeficiencies", v)} textarea />
          </Section>

          {/* ----- CHECK-IN ----- */}
          <Section title="Check-In">
            <Field label="Check-In Date" type="date" value={form.checkInDate} onChange={(v) => set("checkInDate", v)} half />
            <div style={{ display: "inline-block", width: "calc(50% - 8px)" }} />
            <Field label="DLO Qty (Returned)" value={form.dloQtyReturn} onChange={(v) => set("dloQtyReturn", v)} half />
            <Field label="DLO Tote Weights (Returned)" value={form.dloWeightsReturn} onChange={(v) => set("dloWeightsReturn", v)} half />
            <Field label="Male Whips Qty (Returned)" value={form.maleWhipsQtyReturn} onChange={(v) => set("maleWhipsQtyReturn", v)} half />
            <Field label="Male Whips Tote Weights (Returned)" value={form.maleWhipsWeightsReturn} onChange={(v) => set("maleWhipsWeightsReturn", v)} half />
            <Field label="Female Whips Qty (Returned)" value={form.femaleWhipsQtyReturn} onChange={(v) => set("femaleWhipsQtyReturn", v)} half />
            <Field label="Female Whips Tote Weights (Returned)" value={form.femaleWhipsWeightsReturn} onChange={(v) => set("femaleWhipsWeightsReturn", v)} half />
            <Field label="Visual Deficiencies" value={form.visualDeficiencies} onChange={(v) => set("visualDeficiencies", v)} textarea />
            <Field label="Known Deficiencies" value={form.knownDeficiencies} onChange={(v) => set("knownDeficiencies", v)} textarea />
            <Field label="Renter Signature" value={form.renterSignatureCheckin} onChange={(v) => set("renterSignatureCheckin", v)} half />
            <Field label="WWES Representative" value={form.wwesRepCheckin} onChange={(v) => set("wwesRepCheckin", v)} half />
          </Section>

          {/* ----- BACK CHARGES ----- */}
          <Section title="Back Charges">
            <div style={{ border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "var(--input-bg)" }}>
                    <th style={{ textAlign: "left" as const, padding: "8px 10px", fontWeight: 600, color: "var(--label)", fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Item</th>
                    <th style={{ textAlign: "right" as const, padding: "8px 10px", fontWeight: 600, color: "var(--label)", fontSize: 11, width: 80 }}>Unit $</th>
                    <th style={{ textAlign: "center" as const, padding: "8px 10px", fontWeight: 600, color: "var(--label)", fontSize: 11, width: 70 }}>Qty</th>
                    <th style={{ textAlign: "right" as const, padding: "8px 10px", fontWeight: 600, color: "var(--label)", fontSize: 11, width: 90 }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {BACK_CHARGE_ITEMS.map((item, i) => {
                    const qty = form.charges[item.id] || 0;
                    const sub = qty * item.price;
                    return (
                      <tr key={item.id} style={{ borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--input-bg)" }}>
                        <td style={{ padding: "7px 10px", lineHeight: 1.3 }}>{item.label}</td>
                        <td style={{ padding: "7px 10px", textAlign: "right" as const, fontFamily: "'DM Mono', monospace", color: "var(--muted)", fontSize: 12 }}>{formatCurrency(item.price)}</td>
                        <td style={{ padding: "4px 6px", textAlign: "center" as const }}>
                          <input
                            type="number" min="0" value={qty || ""} placeholder="0"
                            onChange={(e) => setCharge(item.id, e.target.value)}
                            style={{ width: 50, textAlign: "center" as const, fontFamily: "'DM Mono', monospace", fontSize: 13, padding: "4px 2px", border: "1px solid var(--border)", borderRadius: 3, background: "var(--input-bg)", color: "var(--text)", outline: "none" }}
                          />
                        </td>
                        <td style={{ padding: "7px 10px", textAlign: "right" as const, fontFamily: "'DM Mono', monospace", fontWeight: sub > 0 ? 500 : 400, color: sub > 0 ? "var(--accent2)" : "var(--muted)", fontSize: 13 }}>
                          {sub > 0 ? formatCurrency(sub) : "\u2014"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: "2px solid var(--accent)" }}>
                    <td colSpan={3} style={{ padding: "10px", fontWeight: 700, fontSize: 14, textAlign: "right" as const }}>TOTAL CHARGES</td>
                    <td style={{ padding: "10px", textAlign: "right" as const, fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 16, color: total > 0 ? "var(--accent2)" : "var(--text)" }}>{formatCurrency(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <Field label="Back Charge Notes" value={form.backChargeNotes} onChange={(v) => set("backChargeNotes", v)} textarea />
              <Field label="Invoice # for Charges" value={form.chargeInvoice} onChange={(v) => set("chargeInvoice", v)} half />
              <Field label="WWES Supervisor" value={form.wwesSupervisor} onChange={(v) => set("wwesSupervisor", v)} half />
            </div>
          </Section>

          {/* ----- LEGAL TERMS ----- */}
          <Section title="Terms and Conditions">
            <LegalTerms />
            <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <input
                type="checkbox" id="acceptTerms" checked={form.acceptedTerms}
                onChange={(e) => set("acceptedTerms", e.target.checked)}
                style={{ marginTop: 3, accentColor: "var(--accent)", width: 16, height: 16, cursor: "pointer" }}
              />
              <label htmlFor="acceptTerms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)", cursor: "pointer", lineHeight: 1.4 }}>
                I have read, understand, and agree to the Terms and Conditions of this DLO Rental Agreement. I acknowledge the safety warnings and my obligations regarding inspection, proper use, insurance, and return of equipment.
              </label>
            </div>
          </Section>

          {/* ----- ACTIONS ----- */}
          <div className="no-print" style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, marginTop: 8 }}>
            <button onClick={handleSave} disabled={!form.acceptedTerms} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "10px 24px",
              background: form.acceptedTerms ? "var(--accent)" : "var(--border)", color: form.acceptedTerms ? "#fff" : "var(--muted)",
              border: "none", borderRadius: 5, cursor: form.acceptedTerms ? "pointer" : "not-allowed", opacity: form.acceptedTerms ? 1 : 0.6,
            }}>{form.acceptedTerms ? "Save Record" : "Accept Terms to Save"}</button>
            <button onClick={() => window.print()} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "10px 24px",
              background: "transparent", color: "var(--label)", border: "1px solid var(--border)", borderRadius: 5, cursor: "pointer",
            }}>Print</button>
            <button onClick={handleClear} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "10px 24px",
              background: "transparent", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 5, cursor: "pointer", marginLeft: "auto",
            }}>Clear Form</button>
            {saveStatus && <span style={{ alignSelf: "center", fontSize: 12, color: saveStatus.startsWith("Error") ? "var(--accent2)" : "var(--green)", fontWeight: 600 }}>{saveStatus}</span>}
          </div>
        </>
      ) : (
        /* ----- HISTORY TAB ----- */
        <div>
          {submissions.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center" as const, color: "var(--muted)", fontSize: 14 }}>No saved records yet.</div>
          ) : (
            <>
              <div className="no-print" style={{ marginBottom: 16 }}>
                <button onClick={() => exportCSV(submissions)} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, padding: "8px 16px",
                  background: "var(--accent)", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer",
                }}>Export All ({submissions.length}) as CSV</button>
              </div>
              {submissions.map((entry) => (
                <div key={entry.id} style={{ border: "1px solid var(--border)", borderRadius: 6, padding: 14, marginBottom: 10, background: "var(--surface)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500 }}>
                      Invoice: {entry.invoice_number || entry.invoiceNumber || "N/A"}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>
                      {entry.created_at ? new Date(entry.created_at).toLocaleString() : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 24, fontSize: 12, color: "var(--label)", flexWrap: "wrap" as const }}>
                    <span>Out: {entry.checkout_date || entry.checkoutDate || "N/A"}</span>
                    <span>In: {entry.check_in_date || entry.checkInDate || "N/A"}</span>
                    <span>DLO: {entry.dlo_qty || entry.dloQty || 0} out / {entry.dlo_qty_return || entry.dloQtyReturn || 0} back</span>
                    <span style={{ fontWeight: 700, color: (entry.total_charges || 0) > 0 ? "var(--accent2)" : "var(--green)" }}>
                      Total: {formatCurrency(entry.total_charges || 0)}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
