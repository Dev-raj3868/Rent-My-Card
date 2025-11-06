import { z } from 'zod';

// Purchase request validation
export const purchaseRequestSchema = z.object({
  product_name: z.string()
    .trim()
    .min(1, "Product name is required")
    .max(200, "Product name must be less than 200 characters"),
  product_price: z.number()
    .positive("Price must be positive")
    .max(10000000, "Price seems unreasonably high"),
  product_url: z.string()
    .trim()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL"
    })
    .optional(),
  message: z.string()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
  mobile_number: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (e.g., +911234567890)")
});

// Profile validation
export const profileSchema = z.object({
  full_name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  phone: z.string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (e.g., +911234567890)")
    .optional()
    .or(z.literal('')),
  address: z.string()
    .max(500, "Address must be less than 500 characters")
    .optional()
    .or(z.literal(''))
});

// Card creation validation
export const creditCardSchema = z.object({
  card_name: z.string()
    .trim()
    .min(1, "Card name is required")
    .max(100, "Card name must be less than 100 characters"),
  card_type: z.string()
    .trim()
    .min(1, "Card type is required")
    .max(50, "Card type must be less than 50 characters"),
  bank_name: z.string()
    .trim()
    .max(100, "Bank name must be less than 100 characters")
    .optional()
    .or(z.literal('')),
  discount_percentage: z.number()
    .int("Discount must be a whole number")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  terms: z.string()
    .max(1000, "Terms must be less than 1000 characters")
    .optional()
    .or(z.literal(''))
});

// Review validation
export const reviewSchema = z.object({
  rating: z.number()
    .int()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5"),
  comment: z.string()
    .trim()
    .min(1, "Please write a comment")
    .max(500, "Comment must be less than 500 characters")
});
