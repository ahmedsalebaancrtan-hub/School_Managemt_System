export interface IListFamilyResponse {
  data: IFamily[];
  is_success: boolean;
  message: string;
}

export interface IFamily {
  id: number;
  familyName: string;
  Parent_one_Name: string;
  parent_one_phone: string;
  Parent_two_name: string;
  Parent_two_phone: string;
  address: string;
  Createdat: Date;
  UpdatedAt: Date;
}