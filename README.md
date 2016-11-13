# wercker-client

[![License](https://img.shields.io/:license-mit-blue.svg)](https://doge.mit-license.org)
[![npm version](https://badge.fury.io/js/wercker-client.svg)](https://badge.fury.io/js/wercker-client)

## Overview

A Node.js API client for [Wercker](http://www.wercker.com/).

## Installation

```bash
npm install wercker-client --save
```

## Usage

```javascript
var Wercker = require('wercker-client');
var wercker = new Wercker({
  token: 'your_token'
});
```

## Available Methods

### Applications

#### [listUserApplications](http://devcenter.wercker.com/docs/api/endpoints/applications#list-user-applications)

List all applications owned by the user or organization.

##### Example Usage

```javascript
wercker.Application
  .listUserApplications({
    username: "your_application_owner_name",
    limit: 10
  }).then((res) => {
    console.log(res);
  });
```

##### Options

|Name|Description|
|:--|:--|
|username|**Required** The name of user or organization.|
|stac|**Optional** Stack used by application. Currently supported: **1 (classic)**, **5 (Docker enabled)**
|limit|**Optional** Limit the results that will get returned. Default: **20**. Min: **1**. Max: **100**.
|skip|**Optional** Skip a certain amount of builds.
|sort|**Optional** Sort builds using this key. Default: **nameAsc**. Possible values: **nameAsc**, **nameDesc**, **createdAtAsc**, **createdAtDesc**, **updatedAtAsc**, **updatedAtDesc**.

### Runs

#### [getAllRuns](http://devcenter.wercker.com/docs/api/endpoints/runs#get-all-runs)

Get the last 20 runs for a given **pipeline** or **application**.

##### Example Usage

```javascript
wercker.Runs
  .getAllRuns({applicationId: "your_application_id"})
  .then((res) => {
    console.log(res);
  });
```

##### Options

Either **applicationId** or **pipelineId** must be specified.

|Name|type|Description|
|:--|:--|:--|
|applicationId|String|**Optional** The id of the application.
|limit|Integer|**Optional** Specify how many run objects should be returned. Max: **20**, default: **20**
|skip|Integer|**Optional** Skip the first X runs. Min: **1**, default: **0**
|sort|String|**Optional** Valid values: **creationDateAsc** or **creationDateDesc**. Default **creationDateDesc**
|status|String|**Optional** Filter by status. Valid values: **notstarted**, **started**, **finished**, **running**
|result|String|**Optional** Filter by result. Valid values: **aborted**, **unknown**, **passed**, **failed**
|branch|String|**Optional** Filter by branch
|pipelineId|String|**Optional** Filter by pipeline
|commit|String|**Optional** Filter by commit hash
|sourceRun|String|**Optional** Filter by source run
|author|String|**Optional** Filter by Wercker username

---

#### [triggerNewRun](http://devcenter.wercker.com/docs/api/endpoints/runs#trigger-a-run)

Trigger a new run for an application.

##### Example Usage

```javascript
wercker.Runs
  .triggerNewRun({
    pipelineId: "your_pipeline_id",
    branch: "branch_name"
  }).then((res) => {
    console.log(res);
  })
```

##### Options

|Name|type|Description|
|:--|:--|:--|
|pipelineId|String|**Required** The id of the pipeline for which a run should be triggered.|
|sourceRunId|String|**Optional** The id of the run that should be used as input for this run, including artifacts. This |is the same as chaining a pipeline.
|branch|String|**Optional** The Git branch that the run should use. If not specified, the default branch will be used.
|commitHash|String|**Optional** The Git commit hash that the run should used. Requires branch to be set. If not |specified, the latest commit is fetched
|message|String|**Optional** The message to use for the run. If not specified, the Git commit message is used.
|envVars|Array of objects|**Optional** Environment variables which should be added to run. Contains objects with keyand value properties.

### Workflows

#### [getAllWorkflows](http://devcenter.wercker.com/docs/api/endpoints/workflows#get-all-workflows)

Get the last 10 workflows.

##### Example Usage

```javascript
wercker.Workflows
  .getAllWorkflows({applicationId: "your_application_id"})
  .then((res) => {
    console.log(res);
  });
```

##### Options

|Name|type|Description|
|:--|:--|:--|
|applicationId|String|**Required** The id of the application.
|limit|Integer|**Optional** Specify how many workflow objects should be returned. Max: **20**, default: **10**
|skip|Integer|**Optional** Skip the first X runs. Min: **0**, default: **0**
|sort|String|**Optional** Valid values: **creationDateAsc** or **creationDateDesc**. Default **creationDateDesc**

---

#### [getWorkflow](http://devcenter.wercker.com/docs/api/endpoints/workflows#get-a-workflow)

Get the details of a single workflow.

##### Example Usage

```javascript
wercker.Workflows
  .getWorkflow({workflowId: "your_workflow_id"})
  .then((res) => {
    console.log(res);
  });
```

##### Options

|Name|type|Description|
|:--|:--|:--|
|workflowId|String|**Required** The id of the workflow.

## Contribute

Contributions are always welcome!

## License

wercker-client is available under the MIT license. See the LICENSE file for more info.
