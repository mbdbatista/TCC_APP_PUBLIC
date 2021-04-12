import { ReportModel } from "../model/report.model";

export type GetFishBreedingReportResponse = {
  fishBreedingStarted: ReportModel[]
  fishBreedingFinished: ReportModel[]
}