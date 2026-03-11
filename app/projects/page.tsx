import { getAllProjects } from "@/lib/projects";
import { ProjectsClient } from "./ProjectsClient";
import { PROJECTS_PAGE_DESCRIPTION } from "@/data/team";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <section className="mb-16 px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            Built. Exploited. Documented.
          </h1>
          <p className="mt-4 leading-[1.7] text-[var(--text-muted)]">
            {PROJECTS_PAGE_DESCRIPTION}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-8 md:px-10" data-animated-section>
        <ProjectsClient projects={projects} />
      </section>
    </>
  );
}
