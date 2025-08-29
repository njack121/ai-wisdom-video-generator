import React from 'react';
import { Composition } from 'remotion';
import { DynamicTemplate } from './TemplateSelector';
import { SimpleGenerativeRenderer } from './SimpleGenerativeRenderer';
import { SVGVideoComposition } from './SVGVideoComposition';
import { TestSVGComponent } from './TestSVGComponent';
import { SimpleGrowthAnimation } from './SimpleGrowthAnimation';
import { SacredGeometryRenderer } from './SacredGeometryRenderer';
import { InfinityRenderer } from './InfinityRenderer';
import { MotivationalGeometryRenderer } from './MotivationalGeometryRenderer';
import { InfinityLoopRenderer } from './InfinityLoopRenderer';
import { PreciseInfinityRenderer } from './PreciseInfinityRenderer';
import { MotivationDisciplineRenderer } from './MotivationDisciplineRenderer';
import { FocusDefeatsDistractionRenderer } from './FocusDefeatsDistractionRenderer';
import { PreciseMotivationDisciplineRenderer } from './PreciseMotivationDisciplineRenderer';
import { PreciseMotivationDisciplineV2Renderer } from './PreciseMotivationDisciplineV2Renderer';
import { BreakthroughMomentRenderer } from './BreakthroughMomentRenderer';
import { ProgressiveGrowthRenderer } from './ProgressiveGrowthRenderer';
import { TreeGrowthRecreatedRenderer } from './TreeGrowthRecreatedRenderer';
import { PingPongNeverGiveUpRenderer } from './PingPongNeverGiveUpRenderer';
import { SimplePingPongRenderer } from './SimplePingPongRenderer';
import { ProgressNotPerfectionRenderer } from './ProgressNotPerfectionRenderer';
import { ProgressNotPerfectionSplitRenderer } from './ProgressNotPerfectionSplitRenderer';
import { ProgressNotPerfectionSimpleRenderer } from './ProgressNotPerfectionSimpleRenderer';
import { HardEasyGraphRenderer } from './HardEasyGraphRenderer';
import { TimePassesGlobeRenderer } from './TimePassesGlobeRenderer';
import { SlowSteadyWinsRenderer } from './SlowSteadyWinsRenderer';
import { MotivationDisciplineRaceRenderer } from './MotivationDisciplineRaceRenderer';
import { PlantingTreesWisdomRenderer } from './PlantingTreesWisdomRenderer';
import { WaterDropStoneRenderer } from './WaterDropStoneRenderer';
import { EmptyCupWisdomRenderer } from './EmptyCupWisdomRenderer';
import { BambooOakWisdomRenderer } from './BambooOakWisdomRenderer';
import { mapConceptToVisual } from './ConceptMapper';

export const RemotionRoot: React.FC = () => {
  const concept = "never give up"; // This will come from your input
  const config = mapConceptToVisual(concept);
  
  return (
    <>
      {/* Original template-based composition */}
      <Composition
        id="MotivationalVideo"
        component={DynamicTemplate}
        durationInFrames={config.duration}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={config}
      />
      
      {/* New generative composition */}
      <Composition
        id="GenerativeVideo"
        component={SimpleGenerativeRenderer}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ animationData: null }}
      />
      
      {/* SVG-based composition */}
      <Composition
        id="SVGVideo"
        component={SVGVideoComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ svgPlan: null, svgAssets: null }}
      />
      
      {/* Simple SVG test */}
      <Composition
        id="SVGTest"
        component={TestSVGComponent}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Embedded SVG test composition */}
      <Composition
        id="EmbeddedSVGTest"
        component={TestSVGComponent}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Simple growth animation */}
      <Composition
        id="SimpleGrowth"
        component={SimpleGrowthAnimation}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Sacred geometry evolution */}
      <Composition
        id="SacredGeometry"
        component={SacredGeometryRenderer}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Minimalist infinity symbol */}
      <Composition
        id="Infinity"
        component={InfinityRenderer}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Motivational sacred geometry */}
      <Composition
        id="MotivationalGeometry"
        component={MotivationalGeometryRenderer}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Infinity loop with synchronized text */}
      <Composition
        id="InfinityLoop"
        component={InfinityLoopRenderer}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Precise 3-second infinity loop */}
      <Composition
        id="PreciseInfinity"
        component={PreciseInfinityRenderer}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Motivation vs Discipline text animation */}
      <Composition
        id="MotivationDiscipline"
        component={MotivationDisciplineRenderer}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* AI-Generated: Focus defeats distraction */}
      <Composition
        id="FocusDefeatsDistraction"
        component={FocusDefeatsDistractionRenderer}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* AI-Generated from your detailed prompt: Precise Motivation vs Discipline */}
      <Composition
        id="PreciseMotivationDiscipline"
        component={PreciseMotivationDisciplineRenderer}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Your EXACT detailed prompt implementation - V2 */}
      <Composition
        id="PreciseMotivationDisciplineV2"
        component={PreciseMotivationDisciplineV2Renderer}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Something completely different - Breakthrough Moment */}
      <Composition
        id="BreakthroughMoment"
        component={BreakthroughMomentRenderer}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Back to the tree-style approach - Progressive Growth */}
      <Composition
        id="ProgressiveGrowth"
        component={ProgressiveGrowthRenderer}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* EXACT recreation of the working tree animation */}
      <Composition
        id="TreeGrowthRecreated"
        component={TreeGrowthRecreatedRenderer}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Ping Pong "Never Give Up" metaphor using tree technique */}
      <Composition
        id="PingPongNeverGiveUp"
        component={PingPongNeverGiveUpRenderer}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Simple clean ping pong - like the tree approach */}
      <Composition
        id="SimplePingPong"
        component={SimplePingPongRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Progress Not Perfection - stair-step metaphor */}
      <Composition
        id="ProgressNotPerfection"
        component={ProgressNotPerfectionRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Progress Not Perfection Split-Screen - detailed implementation */}
      <Composition
        id="ProgressNotPerfectionSplit"
        component={ProgressNotPerfectionSplitRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Progress Not Perfection Simple - like the tree approach */}
      <Composition
        id="ProgressNotPerfectionSimple"
        component={ProgressNotPerfectionSimpleRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Hard Now Easy Later vs Easy Now Hard Later - dual graph animation */}
      <Composition
        id="HardEasyGraph"
        component={HardEasyGraphRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* How Fast Time Passes - rotating Earth globes */}
      <Composition
        id="TimePassesGlobe"
        component={TimePassesGlobeRenderer}
        durationInFrames={900}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Motivation vs Discipline - Slow and Steady Wins */}
      <Composition
        id="SlowSteadyWins"
        component={SlowSteadyWinsRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Motivation vs Discipline Race - Tortoise vs Hare */}
      <Composition
        id="MotivationDisciplineRace"
        component={MotivationDisciplineRaceRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Planting Trees Wisdom - Best time was 20 years ago, second best is now */}
      <Composition
        id="PlantingTreesWisdom"
        component={PlantingTreesWisdomRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Water Drop Stone - Persistence breaks through resistance */}
      <Composition
        id="WaterDropStone"
        component={WaterDropStoneRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Empty Cup Wisdom - You cannot pour from an empty cup */}
      <Composition
        id="EmptyCupWisdom"
        component={EmptyCupWisdomRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
      
      {/* Bamboo Oak Wisdom - Flexibility over rigidity */}
      <Composition
        id="BambooOakWisdom"
        component={BambooOakWisdomRenderer}
        durationInFrames={240}
        fps={30}
        width={608}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
