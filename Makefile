#
# @file
# Makefile for the entire project.
#

DIR_GIT := .git
DIR_NODE_MODULES := node_modules
MAKEFILE := Makefile
GREP := grep -iHn --color

#
# Run JSHint static code analysis.
#
hint:
	@find \( -path './${DIR_NODE_MODULES}' -o -path './${DIR_GIT}' \) -prune -o -iname '*.js' -print0 | xargs -0 jshint

#
# Show all fixmes.
#
fixme:
	@find \( -path './${DIR_NODE_MODULES}' -o -path './${DIR_GIT}' -o -name '${MAKEFILE}' \) -prune -o -type f -print0 | xargs -0 ${GREP} 'fixme\b' || true

#
# Show all todos.
#
todo:
	@find \( -path './${DIR_NODE_MODULES}' -o -path './${DIR_GIT}' -o -name '${MAKEFILE}' \) -prune -o -type f -print0 | xargs -0 ${GREP} 'todo\b' || true

#
# Show contents of directories in a tree-like format.
#
tree:
	@tree -aFI '${DIR_NODE_MODULES}|${DIR_GIT}'

.PHONY:
