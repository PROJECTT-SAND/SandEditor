import { useBoundStore } from "@/store";
import style from "./Settings.module.scss";

export default function Settings() {
  const { isSettingsOpen, setIsSettingsOpen } = useBoundStore();

  const closeSetting = () => {
    setIsSettingsOpen(false);
  }

  return (
    <div className={style.settings_wrapper}>
      {isSettingsOpen ?
        <div className={style.settings}>
          <div className={style.topbar}>
            <span>Settings</span>
            <div className={style.search_wrapper}>
              <input placeholder='Search'></input>
              <></>
            </div>
            <div className={style.close} onClick={closeSetting}></div>
          </div>
          <div className={style.contents_wrapper}>
            <div className={style.sidebar}>
              <div className={style.sidebar_item_highlight}>General</div>
              <div>Code Editer</div>
            </div>
            <div className={style.contents}>
              <h1>General</h1>
              <h2>Layout Size</h2>

              <div className={style.contents_item}>
                <div>
                  <h3>Zoom Size</h3>
                  <i>Set the general layout zoom size.</i>
                </div>
                <input type='number'></input>
              </div>
              <hr />
              <div className={style.contents_item}>
                <div>
                  <h3>Zoom Size</h3>
                  <i>Set the general layout zoom size.</i>
                </div>
                <input type='number'></input>
              </div>
              <hr />
              <div className={style.contents_item}>
                <div>
                  <h3>Zoom Size</h3>
                  <i>Set the general layout zoom size.</i>
                </div>
                <input type='number'></input>
              </div>

              <h2>asdf</h2>
            </div>
          </div>
        </div>
        : ''
      }
    </div>
  )
}