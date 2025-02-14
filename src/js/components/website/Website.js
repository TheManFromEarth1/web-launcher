import { Fade, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, FileCopy } from '@material-ui/icons';

const useStyles = makeStyles({
  website: {
    textDecoration: 'none',
  },

  website_edit_mode: {
    cursor: 'grab',
  },

  website_svg: {
    borderRadius: '8px',
    margin: 'auto',
  },

  website_text: {
    textAlign: 'center',
    color: '#FFF',
    textShadow: '0 0 5px #000',
    width: '125px',
    wordWrap: 'break-word',
  },

  edit_div: {
    position: 'absolute',
  },

  edit_div_layer: {
    backgroundColor: '#0003',
    borderRadius: '8px 0px 8px',
  },

  edit_icons: {
    color: 'white',
  },
});

export default function Website({
  data,
  editMode,
  setWebsiteDialogIndex,
  dispatch,
  index,
}) {
  const classes = useStyles();

  const children = (
    <>
      <div className={classes.edit_div}>
        <Fade in={editMode}>
          <div className={classes.edit_div_layer}>
            <IconButton
              onClick={() => {
                setWebsiteDialogIndex(index);
              }}
              size="small"
              classes={{ root: classes.edit_icons }}
            >
              <Edit fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch({
                  type: 'push',
                  path: 'websites',
                  value: data,
                })
              }
              size="small"
              classes={{ root: classes.edit_icons }}
            >
              <FileCopy fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch({ type: 'remove', path: 'websites', index })
              }
              size="small"
              classes={{ root: classes.edit_icons }}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </div>
        </Fade>
      </div>

      <svg className={classes.website_svg} width="125" viewBox="0 0 100 100">
        <rect
          width="100"
          height="100"
          fill={data.backgroundColor || '#ffffff'}
        />
        {data.icon ? <image href={data.icon} height="100" width="100" /> : ''}
      </svg>
      {data.name ? (
        <Typography className={classes.website_text}>{data.name}</Typography>
      ) : (
        ''
      )}
    </>
  );

  return editMode ? (
    <div className={classes.website_edit_mode}>{children}</div>
  ) : (
    <a className={classes.website} {...(data.url ? { href: data.url } : {})}>
      {children}
    </a>
  );
}
