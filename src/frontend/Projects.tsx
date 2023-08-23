import { useEffect } from 'react'
import { remult } from 'remult'
import { Project } from '../models/Project'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

const projectsRepo = remult.repo(Project)

export function ProjectSelectionComponent({
  orgId,
  selectedProject,
  setSelected,
}: {
  orgId?: string
  selectedProject?: string
  setSelected?: (id: string) => void
}) {
  const qc = useQueryClient()

  const { data: projects } = useQuery(['projects', orgId], () =>
    orgId ? projectsRepo.find({ where: { orgId } }) : []
  )

  useEffect(() => {
    if (!selectedProject) {
      setSelected?.(projects?.[0]?.id || '')
    }
  }, [projects, selectedProject, setSelected])

  useEffect(() => {
    if (selectedProject && !projects?.length) {
      setSelected?.(``)
    }
  }, [projects, selectedProject, setSelected])

  async function addProject() {
    try {
      if (!orgId) throw new Error('No organization found')

      const projectsLength = projects?.length || 0

      await projectsRepo.insert({
        title: `Project ${projectsLength + 1}`,
        orgId,
      })

      qc.invalidateQueries(['projects'])
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="flex">
      {projects?.length ? (
        projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelected?.(project.id)}
            className={clsx(
              'px-3 py-2 border-x bg-gray-100 text-gray-700',
              selectedProject === project.id && 'bg-white text-black text-xl'
            )}
          >
            {project.title}
          </button>
        ))
      ) : (
        <div className="px-3 py-2 text-gray-500">No projects found</div>
      )}
      <span className="grow"></span>
      <button className="px-3 py-2 border-x" onClick={addProject}>
        Add Project
      </button>
    </div>
  )
}
