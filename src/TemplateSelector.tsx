import React from 'react';
import { GrowthPattern } from './GrowthPattern';
import { PersistencePattern } from './templates/PersistencePattern';
import { FocusPattern } from './templates/FocusPattern';
import { BalancePattern } from './templates/BalancePattern';
import { TransformationPattern } from './templates/TransformationPattern';
import { AIConceptAnalysis } from './AIConceptMapper';

// Complete template library
const TEMPLATES = {
  growth: GrowthPattern,
  persistence: PersistencePattern,
  focus: FocusPattern,
  balance: BalancePattern,
  transformation: TransformationPattern,
};

interface TemplateProps extends AIConceptAnalysis {
  concept: string;
  stages: Array<{
    label: string;
    complexity: number;
    rings: number;
    description: string;
  }>;
  primaryColor: string;
  backgroundColor: string;
}

export const DynamicTemplate: React.FC<TemplateProps> = (props) => {
  // Select template based on AI analysis
  const SelectedTemplate = TEMPLATES[props.animationType] || GrowthPattern;
  
  // Transform AI analysis into template props
  const templateProps = {
    concept: props.concept || 'Motivation',
    stages: props.stages || [],
    primaryColor: props.colorScheme?.primary || '#ffffff',
    backgroundColor: '#000000',
    visualMetaphor: props.visualMetaphor || 'A journey of growth',
    mood: props.mood || 'inspiring',
    animationType: props.animationType || 'growth'
  };
  
  return <SelectedTemplate {...templateProps} />;
};