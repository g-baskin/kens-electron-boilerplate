import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import App from '../../src/renderer/App';
import type { ElectronAPI } from '../../src/shared/ipc';

describe('App', () => {
  beforeEach(() => {
    cleanup();
    // Reset mocks to defaults from setup.ts
    window.electronAPI = {
      getAppVersion: vi.fn().mockResolvedValue('1.0.0'),
      getPlatform: vi.fn().mockResolvedValue('test'),
      versions: {
        electron: '33.0.0',
        node: '20.0.0',
        chrome: '130.0.0',
      },
    } satisfies ElectronAPI;
  });

  describe('static rendering', () => {
    it('renders the app title', () => {
      render(<App />);
      expect(screen.getByText('Kens Electron Boilerplate')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
      render(<App />);
      expect(screen.getByText('Ready to build something amazing')).toBeInTheDocument();
    });

    it('renders tech stack badges', () => {
      render(<App />);
      const badges = screen.getAllByText(/^(Electron|React|TypeScript|Vite)$/);
      expect(badges.length).toBeGreaterThanOrEqual(4);
    });

    it('displays static version info from electronAPI.versions', () => {
      render(<App />);
      expect(screen.getByText('33.0.0')).toBeInTheDocument();
      expect(screen.getByText('20.0.0')).toBeInTheDocument();
      expect(screen.getByText('130.0.0')).toBeInTheDocument();
    });

    it('renders the renderer label as React + Vite', () => {
      render(<App />);
      expect(screen.getByText('React + Vite')).toBeInTheDocument();
    });

    it('renders all 6 info card labels', () => {
      const { container } = render(<App />);
      const labels = container.querySelectorAll('.info-card .label');
      const labelTexts = Array.from(labels).map((el) => el.textContent);
      expect(labelTexts).toEqual([
        'App Version',
        'Platform',
        'Electron',
        'Node',
        'Chrome',
        'Renderer',
      ]);
    });
  });

  describe('async IPC behavior', () => {
    it('calls getAppVersion on mount', () => {
      render(<App />);
      expect(window.electronAPI.getAppVersion).toHaveBeenCalledTimes(1);
    });

    it('calls getPlatform on mount', () => {
      render(<App />);
      expect(window.electronAPI.getPlatform).toHaveBeenCalledTimes(1);
    });

    it('displays resolved app version', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('1.0.0')).toBeInTheDocument();
      });
    });

    it('displays resolved platform', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
      });
    });

    it('displays custom version from API', async () => {
      window.electronAPI.getAppVersion = vi.fn().mockResolvedValue('2.5.0');
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('2.5.0')).toBeInTheDocument();
      });
    });

    it('displays custom platform from API', async () => {
      window.electronAPI.getPlatform = vi.fn().mockResolvedValue('darwin');
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText('darwin')).toBeInTheDocument();
      });
    });
  });
});
