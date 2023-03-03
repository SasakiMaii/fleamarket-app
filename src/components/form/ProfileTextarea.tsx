import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";

type ProfileProps = {
  profile: string;
  setProfile: Dispatch<SetStateAction<string>>;
  editProfile?: string | undefined;
};

const ProfileTextarea = (props: ProfileProps) => {
  const { profile, setProfile, editProfile } = props;

  const [text, setText] = useState("");
  const addEmoji = (emoji: string) => () => setProfile(`${profile}${emoji}`);
  return (
    <div>
      <Box my={5}>
        {editProfile ? (
          <>
            <label htmlFor="profile"></label>
            <Textarea
              name="profile"
              id="profile"
              value={editProfile}
              placeholder="プロフィール"
              minRows={2}
              maxRows={4}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setProfile(e.target.value)
              }
              startDecorator={
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("👍")}
                  >
                    👍
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("💖")}
                  >
                    💖
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("😍")}
                  >
                    😍
                  </IconButton>
                </Box>
              }
              sx={{ minWidth: 300 }}
            ></Textarea>
          </>
        ) : (
          <>
            <label htmlFor="profile"></label>
            <Textarea
              name="profile"
              id="profile"
              value={profile}
              placeholder="プロフィール"
              minRows={2}
              maxRows={4}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setProfile(e.target.value)
              }
              startDecorator={
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("👍")}
                  >
                    👍
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("💖")}
                  >
                    💖
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("😍")}
                  >
                    😍
                  </IconButton>
                </Box>
              }
              sx={{ minWidth: 300 }}
            ></Textarea>
          </>
        )}
      </Box>
    </div>
  );
};

export default ProfileTextarea;
