// @flow
import request from "request";

const version = "0.0.2"

export default class Wercker {
  Application: Application;
  Runs: Runs;
  Workflows: Workflows;

  constructor(params: {token: string;}) {

    var headers: Headers = {
      "Authorization": `Bearer ${params.token}`,
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": `horie1024/wercker-client v${version}`
    }

    this.Application = new Application(headers);
    this.Runs = new Runs(headers);
    this.Workflows = new Workflows(headers);
  }
}

class Application {
  headers: Headers;
  constructor(headers: Headers) {
    this.headers = headers;
  }

  listUserApplications(params: {
    username: string;
  }): Promise<Array<ApplicationType>> {
    return (new Request(routes["application"]["listUserApplications"]): Request<Array<ApplicationType>>)
      .setHeader(this.headers)
      .process(params);
  }
}

class Runs {
  headers: Headers;
  constructor(headers: Headers) {
    this.headers = headers;
  }

  getAllRuns(params: {
    [query:
      "applicationId" |
      "limit" |
      "skip" |
      "sort" |
      "status" |
      "result" |
      "branch" |
      "pipelineId" |
      "commit" |
      "sourceRun" |
      "author"]: string | number;
    } = {}): Promise<Array<Run>> {
    return (new Request(routes["runs"]["getAllRuns"]): Request<Array<Run>>)
      .setHeader(this.headers)
      .process(params);
  }

  triggerNewRun(params: {
    pipelineId: string;
    [query: "sourceRunId" | "branch" | "commitHash" | "message" | "envVars"] : string | number;
  }): Promise<Run> {
    return (new Request(routes["runs"]["triggerNewRun"]): Request<Run>)
      .setHeader(this.headers)
      .process(params);
  }
}

class Workflows {
  headers: Headers;
  constructor(headers: Headers) {
    this.headers = headers;
  }

  getAllWorkflows(params: {
    applicationId: string;
    [query: "limit"|"skip"|"sort"]: string | number;
  }): Promise<Array<Workflow>> {
    return (new Request(routes["workflows"]["getAllWorkflows"]): Request<Array<Workflow>>)
      .setHeader(this.headers)
      .process(params);
  }

  getWorkflow(params: {
    workflowId: string;
  }): Promise<Workflow> {
    return (new Request(routes["workflows"]["getWorkflow"]): Request<Workflow>)
      .setHeader(this.headers)
      .process(params);
  }
}

class Request<T> {
  headers: Headers;
  routes: Object;

  constructor(routes: Object) {
    this.routes = routes;
  }

  setHeader(headers: Headers): Request<T> {
    this.headers = headers;
    return this;
  }

  buildUrl(params: Object): string {
    var path: string = this.routes.path,
        pathParams: ?Array<string> = path.match(/:[A-z0-9_-]+/g);

    if (pathParams != null && pathParams.length != 0) {
      for(var pathParam of pathParams) {
        var key = pathParam.replace(":", "");
        if (typeof params[key] !== "undefined") {
          path = path.replace(pathParam, params[key])
        }
      }
    }

    return `https://app.wercker.com${path}`;
  }

  buildRequestData(params): Object {
    var queries: Array<string> = this.routes.queries,
        requestData: Object = {};

    for (var query of queries) {
      if (typeof params[query] !== "undefined") {
        requestData[query] = params[query];
      }
    }

    return requestData;
  }

  buildOptions(params: Object): Options {
    var url = this.buildUrl(params),
        requestData = this.buildRequestData(params),
        method = this.routes.method,
        options: Options = {
          method: method,
          url: url,
          headers: this.headers
        };

    if (method === "get") {
      options.qs = requestData;
    } else if (method === "post") {
      options.body = JSON.stringify(requestData);
    }

    return options;
  }

  process(params: Object): Promise<T> {
    return (async () => {
      return await new Promise((resolve, reject) => {
        request(this.buildOptions(params), (err, res, body) => {
          this.handleResponse(resolve, reject)(res);
        });
      });
    })();
  }

  handleResponse(resolve: Function, reject: Function): Function {
    return (res): void => {
      var response = new Response(res);
      if (response.success()) {
        resolve(response.body);
      } else if (response.clientError()) {
        reject(new Error(`HTTP client error ${response.statusCode}`)); // TODO return error body.
      } else if (response.serverError()) {
        reject(new Error(`HTTP server error ${response.statusCode}`)); // TODO return error body.
      }
    };
  }
}

class Response {
  body: Object;
  statusCode: number;

  constructor(res) {
    this.body = JSON.parse(res.body);
    this.statusCode = res.statusCode;
  }

  success(): boolean {
    return this.statusCode >= 200 && this.statusCode <= 299
  }

  clientError(): boolean {
    return this.statusCode >= 400 && this.statusCode <= 499
  }

  serverError(): boolean {
    return this.statusCode >= 500 && this.statusCode <= 599
  }
}

type HttpMethod =
  | "get"
  | "post";

type dataType =
  | "qs"
  | "body";

type Options = {
  method: HttpMethod;
  url: string;
  headers: Headers;
  [data: dataType]: string | Object;
}

type Headers = {
  "Authorization": string;
  "Content-Type": string;
  "User-Agent": string;
}

type ApplicationType = {
  stack: number;
  privacy: string;
  createdAt: string;
  owner: {
    meta: {
      werckerEmployee: boolean;
      username: string;
    },
    userId: string;
    avatar: {
      gravatar: string;
    },
    name: string;
    type: string;
  },
  name: string;
  url: string;
  id: string;
}

type Run = {
  id: string;
  url: string;
  branch: string;
  commitHash: string;
  createdAt: string;
  finishedAt: string;
  message: string;
  progress: number;
  result: string;
  startedAt: string;
  status: string;
  user: {
    meta: {
      werckerEmployee: boolean;
      username: string
    };
    userId: string;
      avatar: {
        gravatar: string;
      };
    name: string;
    type: string;
  };
  pipeline: {
    id: string;
    url: string;
    createdAt: string;
    name: string;
    permissions: string;
    pipelineName: string;
    setScmProviderStatus: boolean;
    type: string;
  };
}

type Steps =  {
  id: string;
  url: string;
  artifactsUrl: ?string;
  createdAt: string;
  finishedAt: string;
  logUrl: string;
  order: number;
  result: string;
  startedAt: string;
  status: string;
  step: string;
}

type Workflow = {
  url: string;
  createdAt: string;
  data: {
    branch: string;
    message: string;
    sourceRunId: string;
  },
  id: string;
  items: [
    {
      data: {
        targetName: string;
        pipelineId: string;
        restricted: string;
        totalSteps: number;
        currentStep: number;
        stepName: string;
        runId: string;
      };
      id: string;
      progress: number;
      result: string;
      status: string;
      type: string;
      updatedAt: string;
    }
  ];
  startedAt: string;
  trigger: string;
  updatedAt: string;
  user: {
    meta: {
      werckerEmployee: string;
      username: string;
    };
    userId: string;
    avatar: {
      gravatar: string;
    };
    name: string;
    type: string;
  };
}

const routes: Object = {
  application: {
    listUserApplications: {
      method: "get",
      path: "/api/v3/applications/:username",
      queries: ["stack", "limit", "skip", "sort"]
    }
  },
  runs: {
    getAllRuns: {
      method: "get",
      path: "/api/v3/runs",
      queries: [
        "applicationId",
        "limit",
        "skip",
        "sort",
        "status",
        "result",
        "branch",
        "pipelineId",
        "commit",
        "sourceRun",
        "author"
      ]
    },
    getRun: {
      method: "get",
      path: "/api/v3/runs/:run",
      queries: []
    },
    getStepsForRun: {
      method: "get",
      path: "/api/v3/runs/:runId/steps",
      queries: []
    },
    triggerNewRun: {
      method: "post",
      path: "/api/v3/runs",
      queries: ["pipelineId", "sourceRunId", "branch", "commitHash", "message", "envVars"]
    },
    abortRun: {
      method: "post",
      path: "/api/v3/runs/:runId/abort",
      queries: []
    }
  },
  workflows: {
    getAllWorkflows: {
      method: "get",
      path: "/api/v3/workflows",
      queries: ["applicationId", "limit", "skip", "sort"]
    },
    getWorkflow: {
      method: "get",
      path: "/api/v3/workflows/:workflowId",
      queries: []
    }
  }
};
