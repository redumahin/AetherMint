/**
 * Nanotechnology Learning System - Service Exports
 * Central point for importing all nanotechnology services
 */

import { getNeuralInterfaceService, resetNeuralInterfaceService } from './neuralInterface';
import { getNanobotControllerService, resetNanobotControllerService } from './nanobotController';
import { getSkillTrackerService, resetSkillTrackerService } from './skillTracker';
import { getSafetyMonitorService, resetSafetyMonitorService } from './safetyMonitor';
import { getKnowledgeEncoderService, resetKnowledgeEncoderService } from './knowledgeEncoder';
import { getLearningProfileService, resetLearningProfileService } from './learningProfile';
import { getLearningProtocolService, resetLearningProtocolService } from './learningProtocol';

// Re-export types
export type { NeuralInterfaceService } from './neuralInterface';
export type { NanobotControllerService } from './nanobotController';
export type { SkillTrackerService } from './skillTracker';
export type { SafetyMonitorService } from './safetyMonitor';
export type { KnowledgeEncoderService } from './knowledgeEncoder';
export type { LearningProfileService } from './learningProfile';
export type { LearningProtocolService } from './learningProtocol';

// Re-export functions
export {
  getNeuralInterfaceService,
  resetNeuralInterfaceService,
  getNanobotControllerService,
  resetNanobotControllerService,
  getSkillTrackerService,
  resetSkillTrackerService,
  getSafetyMonitorService,
  resetSafetyMonitorService,
  getKnowledgeEncoderService,
  resetKnowledgeEncoderService,
  getLearningProfileService,
  resetLearningProfileService,
  getLearningProtocolService,
  resetLearningProtocolService,
};

/**
 * Helper function to initialize all services for a user
 */
export function initializeNanotechServices(userId: string) {
  return {
    neuralInterface: () => getNeuralInterfaceService(userId),
    nanobot: getNanobotControllerService,
    skillTracker: () => getSkillTrackerService(userId),
    safety: getSafetyMonitorService,
    knowledge: getKnowledgeEncoderService,
    profile: getLearningProfileService,
    protocol: () => getLearningProtocolService(userId)
  };
}

/**
 * Helper function to reset all services
 */
export function resetAllNanotechServices() {
  resetNeuralInterfaceService();
  resetNanobotControllerService();
  resetSkillTrackerService();
  resetSafetyMonitorService();
  resetKnowledgeEncoderService();
  resetLearningProfileService();
  resetLearningProtocolService();
}
