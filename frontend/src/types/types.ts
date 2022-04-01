export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByGender = {
    gender: Gender;
    sum: number;
}

export type SalesSummary = {
    sum?: number;
    min: number;
    max: number;
    avg: number;
    count: number;
  };
