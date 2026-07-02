import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      window.location.href = '/';
    } catch (e) {
      const self = this as any;
      if (typeof self.setState === 'function') {
        self.setState({ hasError: false, error: null });
      }
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans" id="error-boundary-screen">
          <div className="max-w-md w-full bg-white rounded-3xl border border-red-500/20 p-6 sm:p-8 shadow-xl text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">Ops! Algo deu errado</h1>
              <p className="text-sm text-gray-600">
                Ocorreu um erro inesperado ao carregar esta seção. Você pode recarregar a página para voltar ao estado estável.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-left">
                <p className="text-xs font-mono text-gray-500 break-all select-all">
                  {this.state.error.message || String(this.state.error)}
                </p>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full bg-black hover:bg-[#f49e1a] hover:text-black text-white font-mono font-black text-xs uppercase py-3.5 rounded-xl transition cursor-pointer"
            >
              Recarregar e Ir para o Início
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;
