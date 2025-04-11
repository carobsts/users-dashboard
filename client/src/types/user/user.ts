interface UserSchema {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  status: string;
}

type UserType = "Organic" | "Social" | "Direct";

interface UserTypeSchema {
  type: UserType;
  percentage: number;
}

interface UserTypeResponse {
  totalUsers: number;
  distribution: UserTypeSchema[];
}

export type { UserSchema, UserTypeResponse, UserTypeSchema };
