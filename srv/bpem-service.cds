service BpemService {
  entity BpemCases {
    key ID           : String;
        OriginalDate : String;
        Category     : String;
  }

  action numberOfCases(data : numberOfCasesPayload) returns String;

}

type numberOfCasesPayload {
  processor : String;
}
