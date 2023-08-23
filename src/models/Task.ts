import {
  Allow,
  BackendMethod,
  Entity,
  Fields,
  IdEntity,
  Validators,
} from 'remult'

@Entity<Task>('tasks', {
  allowApiCrud: Allow.authenticated,
})
export class Task extends IdEntity {
  @Fields.uuid()
  id = ''

  @Fields.string({
    validate: Validators.required,
  })
  title = ''

  @Fields.boolean({
    defaultValue: () => false,
  })
  completed = false

  @Fields.string({
    validate: Validators.required,
  })
  userId = ''

  @Fields.string()
  projectId = ''

  @Fields.date({ defaultValue: () => new Date() })
  createdAt?: Date

  @BackendMethod({
    allowed: (task, remult) => {
      console.log(`Updating task ${task?.id} by ${remult?.user?.id}`)
      return remult?.user?.id === task?.userId
      // return false
    },
  })
  async toggleCompleted(completed: boolean) {
    this.completed = completed
    await this.save()
  }
}
