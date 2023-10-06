service BpemService {
  entity BpemCases {
    key ID           : String;
        OriginalDate : String;
        Category     : String;
  }

  action overviewMetrics(data : overviewMetricsPayload)  returns String;
  action numberOfCases(startDate : numberOfCasesPayload) returns many String;

}

type overviewMetricsPayload {
  startDate : String;
  endDate   : String;
}

type numberOfCasesPayload {
  processor : String;
}
