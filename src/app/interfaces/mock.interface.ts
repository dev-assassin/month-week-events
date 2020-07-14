import { Activity } from './activity.interface';

export interface MockInterface {
  care_pathway_activities: Activity[];
  version: number;
  id: string;
  scenario_i: string;
  interval: number;
  interval_type: string;
}

