import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseDetailDto } from "@/types/feature/Course";

interface InfoProps {
  course: CourseDetailDto;
}

const InfoLesson: React.FC<InfoProps> = ({ course }) => (
  <section>
    <div className="grid grid-cols-1">
      <Card className="rounded-2xl shadow-none pt-6">
        <CardContent className="flex-grow">
          <h2 className="font-bold text-2xl">{course.name}</h2>

          <div className="mt-5">
            <Tabs defaultValue="tab1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">Mục tiêu</TabsTrigger>
                <TabsTrigger value="tab2">Nội dung</TabsTrigger>
                <TabsTrigger value="tab3">Đối tượng</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <ul className="list-disc pl-5 marker:text-gray-300 leading-7">
                  <li>{course.target}</li>
                  <li>{course.target}</li>
                  <li>{course.target}</li>
                </ul>
              </TabsContent>
              <TabsContent value="tab2">
                <ul className="list-disc pl-5 marker:text-gray-300">
                  <li>{course.content}</li>
                  <li>{course.content}</li>
                  <li>{course.content}</li>
                </ul>
              </TabsContent>
              <TabsContent value="tab3">
                <ul className="list-disc pl-5 marker:text-gray-300">
                  <li>{course.audience}</li>
                  <li>{course.audience}</li>
                  <li>{course.audience}</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default InfoLesson;
