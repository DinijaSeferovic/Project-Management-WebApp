import { createSelector } from "reselect";

const projects = (state) => state.projects;

export const selectProjects = createSelector(
	[projects],
	(projects) => projects.projects
);

export const selectProjectsIds = createSelector([selectProjects], (projects) =>
	Object.values(projects).map((project) => project._id)
);

export const selectCurrentProjectId = createSelector(
	[projects],
	(projects) => projects.currentProjectId
);

export const selectCurrentProject = createSelector(
	[selectProjects, selectCurrentProjectId],
	(projects, pid) => (pid !== null ? projects[pid] : {})
);

export const selectProjectById = (id) =>
	createSelector([selectProjects], (projects) =>
		Object.keys(projects).includes(id) ? projects[id] : null
	);
