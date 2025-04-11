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

interface CreateUserPayload {
  name: string;
  phone: string;
  location: string;
  company: string;
}

export type { UserSchema, UserTypeResponse, UserTypeSchema, CreateUserPayload };
