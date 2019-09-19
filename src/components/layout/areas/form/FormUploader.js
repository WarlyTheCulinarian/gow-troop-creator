import React, {memo} from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Typography, CardContent, Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formElement: {
    margin: `${theme.spacing(1.5)}px 0`
  },
  dropzone: {
    backgroundColor: "#1f1f1f"
  }
}));

const FormUploader = memo(({ handleTroopChange }) => {
  const classes = useStyles();

  const handleChangeFiles = files => {
    handleTroopChange("files", files.length !== 0 ? files[0] : null);
  };

  return (
    <Grid item className={classes.formElement} xs={12}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">Image</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Preferred Size: 460x652
          </Typography>
          <DropzoneArea
            dropzoneClass={classes.dropzone}
            acceptedFiles={["image/*"]}
            filesLimit={1}
            showAlerts
            onChange={handleChangeFiles}
          />
        </CardContent>
      </Card>
    </Grid>
  );
});

export default FormUploader;
