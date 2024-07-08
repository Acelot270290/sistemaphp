import React from "react";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Cards";
import { useDashboard } from "../../hooks/pages/useDashboard";

export default function Home() {
    const { totalAmount, totalMessages, loading } = useDashboard();

    return (
        <>
            <PageTitle title="Dashboard" />
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Home</h1>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-6">
                        <Card
                            title="Últimos Pagamentos"
                            value={`${totalAmount}`}
                            timeFrame="nos últimos 30 dias"
                        />
                    </div>
                    <div className="col-md-6">
                        <Card
                            title="Últimas Mensagens"
                            value={totalMessages}
                            timeFrame="nos últimos 30 dias"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
