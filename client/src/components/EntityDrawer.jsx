import React from 'react';
import { Drawer, Box, Typography } from '@mui/material';

export const EntityDrawer = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  anchor = typeof document !== 'undefined' && document.dir === 'rtl' ? 'left' : 'right',
  className = ''
}) => {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: `entity-drawer ${className}`
        }
      }}
    >
      <Box className="entity-drawer__header">
        <Box>
          <Typography variant="h6" className="entity-drawer__title">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" className="entity-drawer__subtitle" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {children}
    </Drawer>
  );
};

export default EntityDrawer;
