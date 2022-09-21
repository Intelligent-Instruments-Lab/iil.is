import contact from '../../../routes/contact.json'

import Discord from './Discord.svg?url'
import Email from './Email.svg?url'
import Facebook from './Facebook.svg?url'
import GitHub from './GitHub.svg?url'
import Instagram from './Instagram.svg?url'
import LinkedIn from './LinkedIn.svg?url'
import Twitter from './Twitter.svg?url'
import YouTube from './YouTube.svg?url'

const icons = [
	{ "label": "Discord",   "icon": Discord },
	{ "label": "Email",     "icon": Email },
	{ "label": "Facebook",  "icon": Facebook },
	{ "label": "GitHub",    "icon": GitHub },
	{ "label": "Instagram", "icon": Instagram },
	{ "label": "LinkedIn",  "icon": LinkedIn },
	{ "label": "Twitter",   "icon": Twitter },
	{ "label": "YouTube",   "icon": YouTube }
]

// TODO: Error handling
const mapIconsToContacts = (_icons, _contact) => {
	return _contact.map(c => {
		return {
			"url":   c.url,
			"label": c.label,
			"icon":  _icons.filter(i => c.label == i.label)[0].icon
		}
	})
}

const mapped = mapIconsToContacts(icons, contact)

export default mapped
