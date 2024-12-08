export default interface CourseDto {
  id: number;
  name: string;
  thumbnail: string;
  description?: string;
  totalLessons: number;
  completedLessons: number;
}

export interface CourseDetailDto {
  id: number;
  name: string;
  description: string;
  audience: string;
  target: string;
  content: string;
  thumbnail: string;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
