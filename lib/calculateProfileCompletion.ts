import { IUser } from "@/interfaces/userInterfaces";

export function calculateProfileCompletion(user: IUser): number {
  const allFields = [
    "name",
    "family",
    "jobTitle",
    "phone",
    "email",
    "avatar",
    "role",
    "teamId",
  ];

  const completeFields = allFields.filter((field) => {
    const value = user[field as keyof IUser];

    return value !== null && value !== undefined && value !== "";
  });

  const percentage = Math.round(
    (completeFields.length / allFields.length) * 100,
  );
  return percentage;
}
