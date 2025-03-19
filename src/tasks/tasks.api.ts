import {RootApi} from '../root.api'
import {CheckTaskDto} from './dto/check-task.dto'
import {TaskDto} from './dto/task.dto'

export default class TaskApi extends RootApi {
    constructor() {
        super({}, {auth: false})
        this.baseURL = this.baseURL + '/tasks'
    }

    async checkTask({
        id,
        done,
        repsDone,
    }: CheckTaskDto): Promise<TaskDto | undefined> {
        try {
            // mark task as done
            const response = await this.PATCH(`/${id}`, {
                body: JSON.stringify({done, repsDone}),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')
            return data as TaskDto
        } catch (error) {
            console.error(error)
            return
        }
    }
}
