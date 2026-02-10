import { useTestimonials } from "@/hooks/useTestimonials";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { Skeleton } from "@/components/ui/skeleton";

const TestimonialsSection = () => {
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-10 bg-muted relative overflow-hidden">
        <div className="container-custom">
          <SectionHeading
            badge="Testimonials"
            title="Hear from our happy customers"
          />
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden p-5">
                <div className="flex gap-4">
                  <Skeleton className="w-14 h-14 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-80 h-80 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Testimonials"
          title="Hear from our happy customers"
          subtitle="Real stories from clients who trusted us with their construction dreams"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              clientName={testimonial.client_name}
              location={testimonial.location || undefined}
              testimonial={testimonial.testimonial}
              clientImageUrl={testimonial.client_image_url || undefined}
              projectImageUrl={(testimonial as any).project_image_url || undefined}
              videoUrl={testimonial.video_url || undefined}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
