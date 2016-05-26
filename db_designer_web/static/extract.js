#!/usr/bin/env node
YAML = require('yamljs');
//console.log('start')
var args = process.argv.slice(2)
//console.log(args[0])
var module_name = args[0]
var app = module_name.slice(2).split('.')[0]
//console.log(module_name)
var module = require(module_name)
//console.log(module)
var names = Object.keys(module)
//console.log(names)
var i = 0
var j = 0
var k = 0
var fnames = null
var name = null
var fname = null
var o = null
var fn = null
var states = []
var transitions = []
var data = {}
for(i = 0; i < names.length; i++) {
    name = names[i]
    o = module[name]
    //console.log(o)
    //console.log(typeof o)
    if (typeof o !== 'object') {
        continue
    }

    if (typeof o.constructor.super_ === 'undefined') {
        continue
    }

    if (o.constructor.super_.name !== '_State') {
        continue
    }


    fnames = Object.keys(o.__proto__)
    //console.log(fnames)
    for (j = 0; j < fnames.length; j++) {
        fname = fnames[j]
        fn = o.__proto__[fname]
        if (typeof fn.transitions !== 'undefined') {
            for (k = 0; k < fn.transitions.length; k++) {
                transition = fn.transitions[k]
                transitions.push({from_state: name,
                                  to_state: transition,
                                  label: fname})
                //console.log(name + " on " + fname + " to " + fn.transitions)
            }
        }
    }
    states.push({label: name, size: 100, x:100, y:100})
}
data.app = app
data.states = states
data.transitions = transitions
console.log(YAML.stringify(data))

//console.log('end')
