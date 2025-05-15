import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DashboardFinanceiro = () => {
  const [cenario, setCenario] = useState('A');

  // Dados do projeto
  const dadosProjeto = {
    terreno: {
      area: 5000,
      valorTotal: 3700000,
      valorMetade: 1850000,
    },
    construcao: {
      valorMetroQuadrado: 1500,
      areaCasa: 32,
      custoConstrucaoPorCasa: 48000,
      totalCasas: 90,
      casasPorSocio: 45,
    },
    custoConstrucaoTotal: 48000 * 45,
  };

  // Dados dos investidores por cenário
  const dadosInvestidores = {
    A: {
      comprador: {
        custoTerreno: 1850000,
        custoConstrucao: 2160000,
        investimentoTotal: 4010000,
        receitaTotal: 8550000,
        lucroTotal: 4540000,
        lucroPorUnidade: 100889,
        roi: 113.2,
        roiAnualizado: 29.2,
        margemLiquida: 53.1
      },
      proprietario: {
        custoTerreno: 0,
        custoConstrucao: 2160000,
        investimentoTotal: 2160000,
        receitaTotal: 8550000,
        lucroTotal: 6390000,
        lucroPorUnidade: 142000,
        roi: 295.8,
        roiAnualizado: 58.3,
        margemLiquida: 74.7
      },
      precoVenda: 190000
    },
    B: {
      comprador: {
        custoTerreno: 1850000,
        custoConstrucao: 2160000,
        investimentoTotal: 4010000,
        receitaTotal: 9000000,
        lucroTotal: 4990000,
        lucroPorUnidade: 110889,
        roi: 124.4,
        roiAnualizado: 30.7,
        margemLiquida: 55.4
      },
      proprietario: {
        custoTerreno: 0,
        custoConstrucao: 2160000,
        investimentoTotal: 2160000,
        receitaTotal: 9000000,
        lucroTotal: 6840000,
        lucroPorUnidade: 152000,
        roi: 316.7,
        roiAnualizado: 61.2,
        margemLiquida: 76.0
      },
      precoVenda: 200000
    }
  };

  const dadosCenarioAtual = dadosInvestidores[cenario];

  // Dados para os gráficos
  const composicaoCustosComprador = [
    { name: 'Terreno', value: dadosCenarioAtual.comprador.custoTerreno },
    { name: 'Construção', value: dadosCenarioAtual.comprador.custoConstrucao },
  ];

  const comparativoROI = [
    { name: 'Investidor Comprador', valor: dadosCenarioAtual.comprador.roi },
    { name: 'Proprietário do Terreno', valor: dadosCenarioAtual.proprietario.roi },
  ];

  const comparativoROIAnualizado = [
    { name: 'Investidor Comprador', valor: dadosCenarioAtual.comprador.roiAnualizado },
    { name: 'Proprietário do Terreno', valor: dadosCenarioAtual.proprietario.roiAnualizado },
    { name: 'Fundos Imob. Alto Desemp.', valor: 20 },
    { name: 'Imob. Tradicional', valor: 12 },
    { name: 'Taxa Selic', valor: 10.5 },
  ];

  const comparativoMargemLiquida = [
    { name: 'Investidor Comprador', valor: dadosCenarioAtual.comprador.margemLiquida },
    { name: 'Proprietário do Terreno', valor: dadosCenarioAtual.proprietario.margemLiquida },
  ];

  const comparativoInvestimentoRetorno = [
    {
      name: 'Investidor Comprador',
      investimento: dadosCenarioAtual.comprador.investimentoTotal,
      retorno: dadosCenarioAtual.comprador.lucroTotal,
    },
    {
      name: 'Proprietário do Terreno',
      investimento: dadosCenarioAtual.proprietario.investimentoTotal,
      retorno: dadosCenarioAtual.proprietario.lucroTotal,
    },
  ];

  const sensibilidadeROI = [
    { 
      aumento: '-5%', 
      compradorA: 102.0, 
      proprietarioA: 263.9,
      compradorB: 113.2, 
      proprietarioB: 284.8
    },
    { 
      aumento: 'Base', 
      compradorA: 113.2, 
      proprietarioA: 295.8,
      compradorB: 124.4, 
      proprietarioB: 316.7
    },
    { 
      aumento: '+5%', 
      compradorA: 124.4, 
      proprietarioA: 327.7,
      compradorB: 135.6, 
      proprietarioB: 348.6
    },
    { 
      aumento: '+10%', 
      compradorA: 135.6, 
      proprietarioA: 359.6,
      compradorB: 146.8, 
      proprietarioB: 380.5
    },
  ];

  // Cores para os gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-2xl font-bold mb-1">Dashboard Financeiro - Projeto Imobiliário</h1>
        <p className="text-lg">90 casas em terreno de 5.000m²</p>
      </header>

      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Selecione o cenário:</span>
          <button 
            className={`px-4 py-2 rounded ${cenario === 'A' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCenario('A')}>
            Cenário A (R${dadosInvestidores.A.precoVenda.toLocaleString()}/unid.)
          </button>
          <button 
            className={`px-4 py-2 rounded ${cenario === 'B' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCenario('B')}>
            Cenário B (R${dadosInvestidores.B.precoVenda.toLocaleString()}/unid.)
          </button>
        </div>
        <div className="text-sm text-gray-500">
          <span>Custo construção: R$1.500/m² × 32m² = R$48.000/casa</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 overflow-auto">
        {/* Comparativo ROI */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Comparativo ROI Total</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={comparativoROI}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'ROI']} />
              <Bar dataKey="valor" name="ROI Total" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-gray-600">
            <p>Comparativo do Retorno sobre Investimento total entre os dois investidores</p>
          </div>
        </div>

        {/* Comparativo ROI Anualizado */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">ROI Anualizado (36 meses)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={comparativoROIAnualizado}
              margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'ROI Anualizado']} />
              <Bar dataKey="valor" name="ROI Anualizado" fill="#00C49F">
                {comparativoROIAnualizado.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                {comparativoROIAnualizado.map((entry, index) => (
                  <text
                    x={index * (500 / comparativoROIAnualizado.length) + (500 / comparativoROIAnualizado.length) / 2}
                    y={300 - entry.valor * 4}
                    textAnchor="middle"
                    dominantBaseline="bottom"
                    fill="#000"
                    fontSize={12}
                    fontWeight="bold"
                  >
                    {`${entry.valor.toFixed(1)}%`}
                  </text>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-gray-600">
            <p>ROI anualizado considera período total de 36 meses (24 obra + 12 vendas)</p>
          </div>
        </div>

        {/* Composição de Custos */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Composição dos Custos - Investidor Comprador</h2>
          <div className="flex">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={composicaoCustosComprador}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {composicaoCustosComprador.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 flex flex-col justify-center">
              <div className="bg-gray-100 p-3 rounded mb-2">
                <p className="font-medium">Investidor Comprador:</p>
                <p>Terreno: 46,1% (R${dadosCenarioAtual.comprador.custoTerreno.toLocaleString()})</p>
                <p>Construção: 53,9% (R${dadosCenarioAtual.comprador.custoConstrucao.toLocaleString()})</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p className="font-medium">Proprietário do Terreno:</p>
                <p>Terreno: já possui (R$0 efetivo)</p>
                <p>Construção: 100% (R${dadosCenarioAtual.proprietario.custoConstrucao.toLocaleString()})</p>
              </div>
            </div>
          </div>
        </div>

        {/* Margem Líquida */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Margem Líquida</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={comparativoMargemLiquida}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Margem Líquida']} />
              <Bar dataKey="valor" name="Margem Líquida" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-gray-600">
            <p>Para cada R$1,00 de receita:</p>
            <p>- Investidor Comprador: R${(dadosCenarioAtual.comprador.margemLiquida/100).toFixed(2)} de lucro líquido</p>
            <p>- Proprietário do Terreno: R${(dadosCenarioAtual.proprietario.margemLiquida/100).toFixed(2)} de lucro líquido</p>
          </div>
        </div>

        {/* Investimento vs Retorno */}
        <div className="bg-white rounded-lg shadow p-4 col-span-2">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Investimento vs Retorno (Lucro)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={comparativoInvestimentoRetorno}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$ ${(value/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
              <Legend />
              <Bar dataKey="investimento" name="Investimento Total" fill="#8884d8" />
              <Bar dataKey="retorno" name="Lucro Total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Investidor Comprador:</p>
              <p>Investimento: R${dadosCenarioAtual.comprador.investimentoTotal.toLocaleString()}</p>
              <p>Lucro Total: R${dadosCenarioAtual.comprador.lucroTotal.toLocaleString()}</p>
              <p>Lucro por Casa: R${dadosCenarioAtual.comprador.lucroPorUnidade.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium">Proprietário do Terreno:</p>
              <p>Investimento: R${dadosCenarioAtual.proprietario.investimentoTotal.toLocaleString()} (apenas construção)</p>
              <p>Lucro Total: R${dadosCenarioAtual.proprietario.lucroTotal.toLocaleString()}</p>
              <p>Lucro por Casa: R${dadosCenarioAtual.proprietario.lucroPorUnidade.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Análise de Sensibilidade */}
        <div className="bg-white rounded-lg shadow p-4 col-span-2">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Sensibilidade: Impacto do Preço de Venda no ROI</h2>
          <p className="mb-2 text-gray-600">Cada 1% de aumento no preço gera ~2,1% de aumento no ROI para o Comprador e ~3,9% para o Proprietário</p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variação no Preço</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ROI Comprador (Cenário A)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ROI Proprietário (Cenário A)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ROI Comprador (Cenário B)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ROI Proprietário (Cenário B)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sensibilidadeROI.map((item, index) => (
                  <tr key={index} className={index === 1 ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.aumento}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.compradorA.toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.proprietarioA.toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.compradorB.toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.proprietarioB.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="p-4 bg-white border-t mt-auto">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Período total do projeto: 36 meses (24 meses de obra + 12 meses de vendas)</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-blue-700">Projeto Imobiliário - Análise Financeira</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardFinanceiro;