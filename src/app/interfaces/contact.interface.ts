export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  prefix: string;
  jobTitle: string;
  email: string;
  avatar: string;
  notes: string;
  phoneNumbers: IPhoneNumber[];
  checked?: boolean;
}

export interface IPhoneNumber {
  number: string;
  description: string;
}
