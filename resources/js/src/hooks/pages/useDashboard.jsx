import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setHideLoading, setShowLoading } from "../../reducers";
import api from "../../services";
import { showResponseError } from "../../helpers";

export function useDashboard() {
  const [totalAmount, setTotalAmount] = useState("R$0,00");
  const [totalMessages, setTotalMessages] = useState(0);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  const loading = useAppSelector((state) => state.loading.show);

  useEffect(() => {
    const fetchStats = async () => {
      dispatch(setShowLoading());
      try {
        const response = await api.get(`/donations/${userData?.slug}`);
        if (response.status === 200 && response.data && response.data.data) {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          const donations = response.data.data.filter((donation) => {
            const donationDate = new Date(donation.created_at * 1000);
            return donationDate >= thirtyDaysAgo;
          });

          const amountSum = donations.reduce(
            (sum, donation) => sum + parseFloat(donation.amount),
            0
          );
          const formattedAmount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amountSum);

          setTotalAmount(formattedAmount);
          setTotalMessages(donations.length);
        } else {
          throw new Error("Não foi possível obter as estatísticas das doações");
        }
      } catch (error) {
        throw new Error("Usuario não integrado com o streamlabs");
      } finally {
        dispatch(setHideLoading());
      }
    };

    fetchStats();
  }, [dispatch, userData]);

  return { totalAmount, totalMessages, loading };
}
