import { DataTypes } from "sequelize";
import { sequilize } from "../config/postgres.config";

const Video = sequilize.define("Video", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  length: {
    type: DataTypes.FLOAT,
  },
});

export default Video;
