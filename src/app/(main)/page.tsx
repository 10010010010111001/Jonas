import EventsSlider from "@/components/events_slider";
import SolutionsSlider from "@/components/solutions_slider";
import TestimonialsSlider from "@/components/testimonials_slider";

export default function Home() {
  return (
    <div className="w-screen h-full my-[6.5rem] max-w-[99vw]">
      <section className="flex w-full items-center justify-center mt-4">
        <EventsSlider />
      </section>
      <section className="flex px-2 flex-col gap-4 items-center justify-center bg-[#fbfbfb] pt-12">
        <h2 className="text-2xl text-black font-bold">
          Grandes produtores fazem parte da história da Total Acesso
        </h2>
        <div className="md:max-w-[1100px] w-[275px] md:w-full mt-4">
          <TestimonialsSlider />
        </div>
      </section>
      <section className="flex px-2 flex-col gap-4 items-center justify-center bg-[#fff] pt-12">
        <h2 className="text-2xl text-black font-bold">
          Gestão completa do seu evento
        </h2>
        <p>Diversas soluções para cada etapa do seu evento.</p>
        <div className="w-full lg:max-w-[1100px] mt-4">
          <SolutionsSlider />
        </div>
      </section>
    </div>
  );
}
