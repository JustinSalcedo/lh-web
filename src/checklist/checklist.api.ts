import {RootApi} from '../root.api'
import {getUserId} from '../utils/general'
import {ChecklistDto} from './dto/checklist.dto'

export default class ChecklistApi extends RootApi {
    constructor() {
        super({}, {auth: false})
        this.baseURL = this.baseURL + '/checklist'
    }

    async getTodaysChecklist() {
        try {
            const response = await this.GET(`/${getUserId()}`)

            const {status} = response
            const data = await response.json()

            if (!(status === 200 || status === 201))
                throw new Error(data.message || 'Unknown error')
            return data as ChecklistDto
        } catch (error) {
            console.error(error)
            return
        }
    }
}
