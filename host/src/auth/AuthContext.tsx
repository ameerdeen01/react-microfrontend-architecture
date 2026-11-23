
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

interface DemoUser extends AuthUser {
  password: string;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "U001",
    name: "Admin User",
    email: "admin@healthcare.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    id: "U002",
    name: "John Customer",
    email: "user@healthcare.com",
    password: "User@123",
    role: "customer",
  },
];

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
