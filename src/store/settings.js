import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'

const state = {
	calendarName: '',
	organizerName: '',
	organizerEmail: '',
	skillGroups: '',
}

const mutations = {
	updateCalendarName(state, calendarName) {
		state.calendarName = calendarName
	},
	updateOrganizerName(state, organizerName) {
		state.organizerName = organizerName
	},
	updateOrganizerEmail(state, organizerEmail) {
		state.organizerEmail = organizerEmail
	},
	updateSkillGroups(state, skillGroups) {
		state.skillGroups = skillGroups
	},
}

const getters = {
	getCalendarName(state) {
		return state.calendarName
	},
	getOrganizerName(state) {
		return state.organizerName
	},
	getOrganizerEmail(state) {
		return state.organizerEmail
	},
	getSkillGroups(state) {
		return state.skillGroups
	},
}

const actions = {
	async fetchSettings({ state, dispatch, commit }) {
		try {
			const settingsResponse = await axios.get(generateUrl('/apps/shifts/settings'))
			const settings = settingsResponse.data

			commit('updateCalendarName', settings.calendarName)
			commit('updateOrganizerName', settings.organizerName)
			commit('updateOrganizerEmail', settings.organizerEmail)
			commit('updateSkillGroups', settings.skillGroups)
		} catch (e) {
			console.error(e)
			showError(t('shifts', 'Could not fetch data'))
		}
	},
}

export default { state, mutations, getters, actions }
