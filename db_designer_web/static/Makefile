
.PHONY: all generate lint


all: main

main:
	browserify main.js  --standalone main > bundle.js

generate-main-fsm:
	fsm-designer generate-js main_fsm.yml fsm.js

generate-button-fsm:
	fsm-designer generate-js button_fsm.yml button_fsm.js

generate-view-fsm:
	fsm-designer generate-js view_fsm.yml view_fsm.js

generate-menu-fsm:
	fsm-designer generate-js menu_fsm.yml menu_fsm.js

lint:
	eslint fsm.js models.js widgets.js settings.js button_fsm.js sketch.js view_fsm.js menu_fsm.js

