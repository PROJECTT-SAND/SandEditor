import style from './Toolbar.module.scss';
import { useBoundStore } from '@/store'
import { system } from '@/system';
import Window from '@components/Window/Window'

import { ReactComponent as PlaySVG } from '@assets/icon/toolbar/player/play.svg';
import { ReactComponent as PauseSVG } from '@assets/icon/toolbar/player/pause.svg';
import { ReactComponent as StopSVG } from '@assets/icon/toolbar/player/stop.svg';
import { ReactComponent as GullscreenSVG } from '@assets/icon/toolbar/option/fullscreen.svg';
import { ReactComponent as ShowgridSVG } from '@assets/icon/toolbar/option/showgrid.svg';
import { ReactComponent as HandSVG } from '@assets/icon/toolbar/tool/hand.svg';
import { ReactComponent as MoveSVG } from '@assets/icon/toolbar/tool/move.svg';

import PositionIndicator from './PosIndicator';
import Option from './Option';
import PlayerButton from './PlayerButton';
import Tool from './Tool';

import { TOOL, OPTION, LIFECYCLE, PLAYER, ButtonState, ButtonLifeCycle } from '../../constants';

export default function ViewerController() {
  function Player() {
    const { currentLifeCycle } = useBoundStore();

    return (
      <>
        <PlayerButton PlayerButtonEnum={PLAYER.Play} style_={style.play} func={() => {
          if (ButtonLifeCycle[currentLifeCycle].play === ButtonState.DEFAULT) {
            if (currentLifeCycle === LIFECYCLE.IDLE) {
              (async () => await system.run("sys start"))();
            } else if (currentLifeCycle === LIFECYCLE.PAUSE) {
              (async () => await system.run("sys restart"))();
            }
          }
        }}>
          <PlaySVG />
        </PlayerButton>

        <PlayerButton PlayerButtonEnum={PLAYER.Pause} style_={style.pause} func={() => {
          if (ButtonLifeCycle[currentLifeCycle].pause === ButtonState.DEFAULT) {
            (async () => await system.run("sys pause"))();
          }
        }}>
          <PauseSVG />
        </PlayerButton>

        <PlayerButton PlayerButtonEnum={PLAYER.Stop} style_={style.stop} func={() => {
          if (ButtonLifeCycle[currentLifeCycle].stop === ButtonState.DEFAULT) {
            if (currentLifeCycle === LIFECYCLE.RUNNING || currentLifeCycle === LIFECYCLE.PAUSE) {
              (async () => await system.run("sys stop"))();
            }
          }
        }}>
          <StopSVG />
        </PlayerButton>
      </>
    )
  }

  return (
    <Window>
      <div className={style.viewerController}>
        <PositionIndicator />

        <div className={style.options}>
          <Option style_={style.showGrid} optionEnum={OPTION.FullScreen}>
            <GullscreenSVG />
          </Option>

          <Option style_={style.fullScreen} optionEnum={OPTION.ShowGrid}>
            <ShowgridSVG />
          </Option>
        </div>

        <div className={style.tool}>
          <Tool style_={style.tool_hand} toolEnum={TOOL.Hand}>
            <HandSVG />
          </Tool>
          <Tool style_={style.tool_move} toolEnum={TOOL.Move}>
            <MoveSVG />
          </Tool>
        </div>

        <div className={style.player}>
          <Player />
        </div>
      </div>
    </Window>

  );
}