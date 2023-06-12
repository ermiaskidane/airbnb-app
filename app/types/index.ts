import { Listing, Reservation, User } from "@prisma/client";

// this type/index.ts file is dealing for the "date object error"
// occurs when server componenet pass a date to a client component
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

// export type SafeReservation = Omit<
//   Reservation, 
//   "createdAt" | "startDate" | "endDate" | "listing"
// > & {
//   createdAt: string;
//   startDate: string;
//   endDate: string;
//   listing: SafeListing;
// };

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};