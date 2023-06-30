import style from './Tools.module.scss';
import { useBoundStore } from '@/store'
import { system } from '@/system/system';
import { useEffect, useRef, useState } from 'react';

import Option from './Option';
import PlayerButton from './PlayerButton';
import Tool from './Tool';

import { TOOL, OPTION, LIFECYCLE, PLAYER, ButtonState, ButtonLifeCycle } from '@/constants';

import { ReactComponent as PlaySVG } from '@assets/image/icon/toolbar/player/play.svg';
import { ReactComponent as PauseSVG } from '@assets/image/icon/toolbar/player/pause.svg';
import { ReactComponent as StopSVG } from '@assets/image/icon/toolbar/player/stop.svg';
import { ReactComponent as GullscreenSVG } from '@assets/image/icon/toolbar/option/fullscreen.svg';
import { ReactComponent as ShowgridSVG } from '@assets/image/icon/toolbar/option/showgrid.svg';
import { ReactComponent as HandSVG } from '@assets/image/icon/toolbar/tool/hand.svg';
import { ReactComponent as MoveSVG } from '@assets/image/icon/toolbar/tool/move.svg';

export default function ViewerController() {
  const { currentLifeCycle, optionState } = useBoundStore();
  const [hideTools, setHideTools] = useState(false);
  const wrapperElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (optionState.fullScreen) {
      setHideTools(false);

      setTimeout(() => {
        setHideTools(true);
      }, 100);
    } else {
      setHideTools(false);
    }
  }, [optionState.fullScreen])

  useEffect(() => {
    if (!wrapperElem.current) return;
    wrapperElem.current.addEventListener('mouseenter', () => {
      setHideTools(false);
    })
    wrapperElem.current.addEventListener('mouseleave', () => {
      setHideTools(true);
    })
  }, [])

  function Player() {
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
    <div className={`${style.tools_wrap} ${optionState.fullScreen ? style.tools_fullscreen : ''}`} ref={wrapperElem}>
      <div className={`${style.tools} ${hideTools ? style.tools_hide : ''}`}>
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
    </div>
  );
}